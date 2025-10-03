import { Socket } from "socket.io-client";

export class rtc{
    private pc! : RTCPeerConnection 
    private socket :Socket
    public roomid!: string
    private initaotr!:boolean
    constructor(socket:Socket){
        this.socket = socket
    }

    async createPeerConnection(initaotr:boolean,roomid?:string ){
    this.initaotr = initaotr
    if(roomid){
    this.roomid = roomid
    }
    
    this.pc = new RTCPeerConnection();

    this.pc.onicecandidate =  this.handleICECandidateEvent.bind(this);
    this.pc.ontrack =  this.handletrack.bind(this);
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach(track => this.pc.addTrack(track, localStream));
    if(this.initaotr == true){
    this.pc.onnegotiationneeded = this.handleNegotiationNeededEvent.bind(this);
    }

    }

    handleICECandidateEvent(e:any){
    if(e.candidate){
        this.sendToServer({
            type: "new-ice-candidate",
            roomid:this.roomid,
            candidate: e.candidate,     
            })
        }
    }

    handletrack(event:any)  {
        console.log("remote tracks added")
            const remoteStream = event.streams[0];
            const remoteVideo = document.querySelector("video#remote") as HTMLVideoElement;
            if(remoteVideo){
                remoteVideo.srcObject=remoteStream
            }
    }

    async handleNegotiationNeededEvent(){
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
        const tracks = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
         tracks.getTracks().forEach(element => {
                    this.pc.addTrack(element)
        });
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
        console.log(this.pc);
        if(!this.pc){
            console.log("pc is not defined yet")
        }
        const candidate =  new RTCIceCandidate(msg.candidate);
        this.pc.addIceCandidate(candidate)
    }

    sendToServer(msg :any){
        this.socket.emit(msg.type
            ,msg)
    }

}

 