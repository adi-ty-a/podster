import { Socket } from "socket.io-client";

interface chat{
    chat:{
        id:"user1"|"user2",
        message:string
    }
}

export class rtc{
    private pc! : RTCPeerConnection 
    private socket :Socket
    public roomid!: string
    private initaotr!:boolean
    private track : MediaStream
    private onRemoteStream?:(stream:MediaStream)=>void;

    constructor( track:MediaStream,socket:Socket,onRemoteStream:(stream:MediaStream)=>void){
        this.socket = socket
        this.track = track
        this.onRemoteStream = onRemoteStream;
    }

    async createPeerConnection(initaotr:boolean,roomid?:string ){
        if (roomid)this.roomid = roomid;
        this.initaotr = initaotr
        this.pc = new RTCPeerConnection(
                            {
                iceServers: [
                    {
                    urls: "stun:stun.l.google.com:19302"
                    }
                ]
}
        );
        this.pc.onicecandidate =  this.handleICECandidateEvent;
        this.pc.ontrack =  this.handletrack;
        this.track.getTracks().forEach(track => this.pc.addTrack(track, this.track));
        if(this.initaotr == true){
            this.pc.onnegotiationneeded = this.handleNegotiationNeededEvent;
        }
    }

    handleICECandidateEvent=(e:RTCPeerConnectionIceEvent)=>{
        this.sendToServer({
            type: "new-ice-candidate",
            roomid:this.roomid,
            candidate: e.candidate,     
            })
    }

    handletrack=(event:RTCTrackEvent)=>{
            const remoteStream =  event.streams[event.streams.length - 1];
            if (!remoteStream) return 
            if(!this.onRemoteStream) return
            this.onRemoteStream(remoteStream);
            remoteStream.onremovetrack  = this.handleRemoveTrackEvent;
    }

    handleRemoveTrackEvent=()=>{
        const stream = document.getElementById("video#remote") as HTMLVideoElement;
        if(stream.srcObject instanceof MediaStream){
        const streamobject = stream.srcObject.getTracks()
        
            if(streamobject.length == 0){
                 this.closeVideoCall();
            }
        }
    }

    handleNegotiationNeededEvent=async ()=>{
        const offer  = await this.pc.createOffer()
        await this.pc.setLocalDescription(offer)
        this.sendToServer({
            type: "offer",
            roomid:this.roomid,
            sdp: this.pc.localDescription,
        }); 

    }

    async handleVideoOfferMsg(msg : any){
        await this.createPeerConnection(false)
        const dsec = new RTCSessionDescription(msg.sdp);
        await this.pc.setRemoteDescription(dsec);
        const answer =  await this.pc.createAnswer();
        await this.pc.setLocalDescription(answer);
        const res ={
        type: "answer",
        roomid:this.roomid,
        sdp: this.pc.localDescription,
        }
        this.sendToServer(res);
    }

    async handleVideoAnswerMsg(msg :any) {
        const desc = new RTCSessionDescription(msg.sdp);
        await this.pc.setRemoteDescription(desc).catch(window.reportError);
    }

     handleNewICECandidateMsg(msg: any){
        const candidate =  new RTCIceCandidate(msg.candidate);
        this.pc.addIceCandidate(candidate)
    }

    hangupcall(){
        this.closeVideoCall()
        this.sendToServer({
            type:"hangup",
        })
    }
    
    closeVideoCall(){
        this.pc.ontrack = null
        this.pc.onicecandidate = null
        this.pc.onnegotiationneeded= null
        const senderlist = this.pc.getSenders()
        senderlist.forEach((e)=>{
            e.track?.stop()
        })
        this.pc.close()
    }
    

    sendToServer(msg :any){
        this.socket.emit(msg.type
            ,msg)
    }
}