import axios from "axios";
import { rtc } from "../webrtc_Logic";
import { socketManager } from "./socketmanager";

export class rtcmanage{
    public rtc :rtc;
    constructor(public socket:socketManager,public tracks:()=>Promise<MediaStream>,private onRemoteStream:(media:MediaStream)=>void,private onUserConnected:(value:boolean)=>void,public roomid: string){
        const iceServer = this.geticecred();
        this.rtc = new rtc(this.tracks,this.socket,this.onRemoteStream,this.roomid,iceServer);
        this.setuplistners();
    }

    setuplistners(){
        this.socket.on("send-offer",(data)=>{
            this.User_connected();
            const roomid = data.roomid;
            this.rtc.createPeerConnection(true,roomid)});
        this.socket.on("Offer",(data)=>{
            this.User_connected();
            this.rtc.handleOffer(data)});
        this.socket.on("answer",async (data)=>{
            this.rtc.handlAnswer(data)});
        this.socket.on("new-ice-candidate",(data)=>this.rtc.handleNewICECandidateMsg(data));
    }

    async geticecred(){
        return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getcredentials`)
    }

    closeRtc(){
        this.User_disconnected();
        this.rtc.hangupcall();
    }

    User_connected(){
        this.onUserConnected(true);
    }

    User_disconnected(){
        this.onUserConnected(false);
    }
} 