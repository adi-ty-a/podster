import { Socket } from "socket.io-client";
import { rtc } from "./webrtc_Logic";

class RtcManager {
    private rtcmanager : rtc; 
    private socket: Socket;
    private setRemoteStream ?:(media:MediaStream)=>void;
    private tracks:MediaStream;
    constructor(socket:Socket,setRemoteStream:(media:MediaStream)=>void,tracks:MediaStream){
        this.socket=socket;
        this.setRemoteStream=setRemoteStream
        this.tracks=tracks
        this.rtcmanager = new rtc(this.tracks,this.socket,this.setRemoteStream)
    }
    public connect=()=>{
        
    }
}