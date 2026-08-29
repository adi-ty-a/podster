import { socketManager } from "./managers/socketmanager";

interface chat {
    chat: {
        id: "user1" | "user2",
        message: string
    }
}

export class rtc {
    private pc!: RTCPeerConnection
    private socket: socketManager
    private initaotr!: boolean
    private track: () => Promise<MediaStream>;
    private onRemoteStream?: (stream: MediaStream) => void;
    public iceCandidateBuffer: any = [];
    constructor(track: () => Promise<MediaStream>, socket: socketManager, onRemoteStream: (stream: MediaStream) => void, public roomid: string, public iceServer: any) {
        this.socket = socket
        this.track = track
        this.onRemoteStream = onRemoteStream;
    }

    async createPeerConnection(initaotr: boolean, roomid?: string) {
        if (roomid) this.roomid = roomid;
        this.initaotr = initaotr
        this.pc = new RTCPeerConnection({ ...this.iceServer, iceTransportPolicy: 'relay' });
        this.pc.onicecandidate = this.handleICECandidateEvent;
        this.pc.ontrack = this.handletrack;
        this.pc.onconnectionstatechange = async () => { console.log("CONNECTION STATE:", this.pc.connectionState) }
        this.pc.onsignalingstatechange = () => { console.log("SIGNALING STATE:", this.pc.signalingState) }
        this.pc.onicegatheringstatechange = () => { console.log("ICE GATHERING:", this.pc.iceGatheringState) }
        this.pc.oniceconnectionstatechange = () => { console.log("ICE STATE", this.pc.iceConnectionState) }
        const tracks = await this.track()
        tracks.getTracks().forEach(track => this.pc.addTrack(track, tracks));
        if (this.initaotr == true) {
            this.pc.onnegotiationneeded = this.handleNegotiationNeededEvent;
        }
    }

    handleICECandidateEvent = (e: RTCPeerConnectionIceEvent) => {
        if (!e.candidate) return;
        console.log("ice candidate")
        console.log(e.candidate);
        this.sendToServer({
            type: "new-ice-candidate",
            roomid: this.roomid,
            candidate: e.candidate,
        })
    }

    handletrack = (event: RTCTrackEvent) => {
        const remoteStream = event.streams[event.streams.length - 1];
        if (!remoteStream) return
        if (!this.onRemoteStream) return
        this.onRemoteStream(remoteStream);
        remoteStream.onremovetrack = this.handleRemoveTrackEvent;
    }

    handleRemoveTrackEvent = () => {
        const stream = document.getElementById("video#remote") as HTMLVideoElement;
        if (stream.srcObject instanceof MediaStream) {
            const streamobject = stream.srcObject.getTracks()

            if (streamobject.length == 0) {
                this.closeVideoCall();
            }
        }
    }

    handleNegotiationNeededEvent = async () => {
        console.log("handlenegotiation");
        const offer = await this.pc.createOffer()
        await this.pc.setLocalDescription(offer)
        this.sendToServer({
            type: "offer",
            roomid: this.roomid,
            sdp: this.pc.localDescription,
        });
    }

    async handleOffer(msg: any) {
        await this.createPeerConnection(false)
        const dsec = new RTCSessionDescription(msg.sdp);
        await this.pc.setRemoteDescription(dsec);
        const answer = await this.pc.createAnswer();
        await this.pc.setLocalDescription(answer);
        this.flushPendingCandidates();
        const res = {
            type: "answer",
            roomid: this.roomid,
            sdp: this.pc.localDescription,
        }
        this.sendToServer(res);
    }

    async handlAnswer(msg: any) {
        const desc = new RTCSessionDescription(msg.sdp);
        await this.pc.setRemoteDescription(desc).catch(window.reportError);
        this.flushPendingCandidates();
    }

    async handleNewICECandidateMsg(msg: any) {
        try {
            if (!this.pc || !this.pc.remoteDescription) {
                this.iceCandidateBuffer.push(msg.candidate);
                return
            }
            const candidate = new RTCIceCandidate(msg.candidate);
            await this.pc.addIceCandidate(candidate)
            console.log(
                "Remote ICE candidate added:",
                candidate.type,
                candidate.address,
                candidate.port
            );
        } catch (e) {
            console.error("FAILED TO ADD ICE CANDIDATE", e, msg.candidate);
        }
    }

    flushPendingCandidates() {
        this.iceCandidateBuffer.forEach((c: RTCIceCandidate) => this.pc.addIceCandidate(new RTCIceCandidate(c)));
        this.iceCandidateBuffer = [];
    }

    hangupcall() {
        this.closeVideoCall()
        this.sendToServer({
            type: "hangup",
        })
    }

    closeVideoCall() {
        this.pc.ontrack = null
        this.pc.onicecandidate = null
        this.pc.onnegotiationneeded = null
        const senderlist = this.pc.getSenders()
        senderlist.forEach((e) => {
            e.track?.stop()
        })
        this.pc.close()
    }


    sendToServer(msg: any) {
         console.log("sendtoservercalled");
        this.socket.emit(msg.type
            , msg)
    }
}