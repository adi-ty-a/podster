import { io, Socket } from "socket.io-client";
import { rtc } from "./webrtc_Logic";
import { Dispatch, SetStateAction } from "react";
import { useRecording } from "../store"
interface chats{
        user:"user1"|"user2",
        msg:string,
    }

export class webrtcmanager{
    public localstream:MediaStream|undefined;
    public remotestream:MediaStream|undefined;
    public server :Socket;
    private currtc:rtc|undefined;
    private roomid:string|undefined;
    public chats:chats[] =[]
    public callback?:(data:boolean)=>void;
    public callend?:()=>void;
    private setRemoteStream ?:(media:MediaStream)=>void;
    public setuserconnected?:Dispatch<SetStateAction<boolean>>;
    public setisRemoteVideoEnabled?:Dispatch<SetStateAction<boolean>>;
    public setisLocalVideoEnabled?:Dispatch<SetStateAction<boolean>>;

    constructor(){
        this.server = io("http://localhost:3001",{withCredentials:true});
        this.server.on("connect_error",(err)=>{
            console.log(err.message)
        })
    }
    stop(){
        useRecording.getState().setisrecording(false);
    }

    Connect(tracks:MediaStream,action:"join"|"create",roomid?:string){
        this.currtc = new rtc(tracks,this.server,this.setRemoteStream!)
        this.setuplistners();
        if(roomid  && roomid != "none" && this.currtc){ this.currtc.roomid = roomid}
        if(action == "create"  && roomid != "none"){
                const res = this.server.emit("create")
            }else if(action == "join" && roomid != "none"){
                const res = this.server.emit("join",{roomid})
        }
    } 
    
    setuplistners(){
        if(this.currtc != undefined){
            this.server.on("room-closed",()=>this.closeroom())
            this.server.on("roomid",(roomid)=>{if(this.currtc)this.currtc.roomid = roomid})
            this.server.on("send-offer",(data)=> {
                this.setuserconnected?.(true);    
                this.currtc?.createPeerConnection(true,data.roomid)});
            this.server.on("Offer",(msg) =>{
                this.setuserconnected?.(true);  
                this.currtc?.handleVideoOfferMsg(msg)});
            this.server.on("answer",(msg) => this.currtc?.handleVideoAnswerMsg(msg));
            this.server.on("new-ice-candidate",(msg) => this.currtc?.handleNewICECandidateMsg(msg));
            this.server.on("record-permission",()=> this.callback?.(true))
            this.server.on("end_recording",()=>{
                stop();
                this.callend?.()});
            };
            this.server.on("connect_error",(err : Error)=>{
                console.log(err instanceof Error);
            })
            this.server.on("video-state",({state})=>{
                console.log(state);
                this.setisRemoteVideoEnabled?.(state)})
            this.server.on("hangup",()=>{
                this.hangup()})
    }

    async getmeida(){
        if(!this.localstream){
            this.localstream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
                    return this.localstream
        }
    }

    togglevideo = () => {
        if(this.localstream && this.server){
            this.localstream?.getVideoTracks().forEach((e)=>{
                e.enabled = !e.enabled
                this.server.emit("video-state",{state:e.enabled})
                this.setisLocalVideoEnabled?.(e.enabled);
            })
        }
    };

    toggleaduio = () => {
        if(this.localstream){
                this.localstream?.getAudioTracks().forEach((e)=>{
                e.enabled = !e.enabled
            })
        }
    };

    createroom=(room:string)=>{
        if(this.localstream){
            this.Connect(this.localstream,"create");
        }
    }

    joinroom=(roomid:string)=>{
        if(roomid) this.roomid = roomid;
        if(this.localstream){
            this.Connect(this.localstream,"join",roomid);
        }
    }

    hangup =()=>{
        if(this.currtc){
            this.currtc.hangupcall()
        }
        this.setuserconnected?.(false);
        this.server.removeAllListeners()
        this.server.close()
        this.roomid = "none"
    }

    sendmsg=(msg:string)=>{
        if(this.server && this.roomid){
            const roomid = this.roomid
            this.server.emit("msg",{roomid,msg})
            this.chats.push({user:"user1",msg:msg});
        }
    }

    closeroom(){
        this.currtc?.closeVideoCall()
        this.server.close()
        this.roomid = "none";
    }

    record_permission():Promise<any>{
        return new Promise((resolve)=>{
        if(this.roomid)
        this.server.emit("request-permission",{roomid :this.roomid});
        this.server.on("record-response",(msg)=>{
            resolve(msg);
        })
        })
    }

    permissionResponse(permission:boolean){
        this.server.emit("permission-response",{roomid :this.roomid,permission:permission})
    }

    setcallback(callback?:(msg:boolean)=>void,videoStop?:()=>void,setuserconnected?:Dispatch<SetStateAction<boolean>>,setRemoteStream?:(media:MediaStream)=>void,setisRemoteVideoEnabled?:Dispatch<SetStateAction<boolean>>,setisLocalVideoEnabled?:Dispatch<SetStateAction<boolean>>){
        this.callback = callback;
        this.callend = videoStop;
        this.setuserconnected = setuserconnected;
        this.setRemoteStream = setRemoteStream;
        this.setisRemoteVideoEnabled = setisRemoteVideoEnabled;
        this.setisLocalVideoEnabled = setisLocalVideoEnabled;
    }

    endrecording(){
        this.server.emit("end_recording",{roomid:this.roomid});
    }
}