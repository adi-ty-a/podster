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
    public onCallback?:(data:boolean)=>void;
    public onCallend?:()=>void;
    public onRemoteStream ?:(media:MediaStream)=>void;
    // public setuserconnected?:Dispatch<SetStateAction<boolean>>;
    public onUserConnected?:(value:boolean)=>void;
    public onIsRemoteVideoEnabled?:(state:boolean)=>void;
    public onIsLocalVideoEnabled?:(state:boolean)=>void;

    constructor(){
        this.server = io("http://localhost:3001",{withCredentials:true});
        this.server.on("connect_error",(err)=>{
            console.log(err.message)
        })
    }
    
    Connect(tracks:MediaStream,action:"join"|"create",roomid?:string){
        this.currtc = new rtc(tracks,this.server,this.onRemoteStream!)
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
                    this.onUserConnected?.(true)
                    this.currtc?.createPeerConnection(true,data.roomid)});
                    this.server.on("Offer",(msg) =>{
                        this.onUserConnected?.(true)
                        this.currtc?.handleVideoOfferMsg(msg)});
                        this.server.on("answer",(msg) => this.currtc?.handleVideoAnswerMsg(msg));
                        this.server.on("new-ice-candidate",(msg) => this.currtc?.handleNewICECandidateMsg(msg));
                        this.server.on("record-permission",()=> this.onCallback?.(true))
                        this.server.on("end_recording",()=>{
                            this.stop();
                            this.onCallend?.()});
            };
            this.server.on("connect_error",(err : Error)=>{
                console.log(err instanceof Error);
            })
            this.server.on("video-state",({state})=>{
                this.onIsRemoteVideoEnabled?.(state)})
            this.server.on("hangup",()=>{
                console.log("event call")
                this.hangup()})
            }
            
    async getmedia(){
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
                this.onIsLocalVideoEnabled?.(e.enabled);
            })
        }
    };


    toggleaduio = () => {
        if(this.localstream){
            this.localstream?.getAudioTracks().forEach((e:any)=>{
                e.enabled = !e.enabled
            })
        }
    };
    
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
        // this.setuserconnected?.(false);
        this.onUserConnected?.(false)
        this.server.close()
        this.server.removeAllListeners()
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
    
    endrecording(){
        this.server.emit("end_recording",{roomid:this.roomid});
    }

    stop(){
        useRecording.getState().setisrecording(false);
    }
}