import { io, Socket } from "socket.io-client";
import { rtc } from "./webrtc_Logic";
import { SetStateAction } from "react";
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
    constructor(){
        this.server = io("http://localhost:3001");
    }

    Connect(tracks:MediaStream,action:"join"|"create",roomid?:string){
        this.currtc = new rtc(tracks,this.server)
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
            this.server.on("send-offer",(data)=> {console.log("offer call") 
            this.currtc?.createPeerConnection(true,data.roomid)});
            this.server.on("Offer",(msg) =>  this.currtc?.handleVideoOfferMsg(msg));
            this.server.on("answer",(msg) => this.currtc?.handleVideoAnswerMsg(msg));
            this.server.on("new-ice-candidate",(msg) => this.currtc?.handleNewICECandidateMsg(msg));
        }
    }

    async getmeida(){
        if(!this.localstream){
            this.localstream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
                    return this.localstream
        }
    }

    togglevideo = () => {
        if(this.localstream){
                this.localstream?.getVideoTracks().forEach((e)=>{
                e.enabled = !e.enabled
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
        this.server.emit("request-permission",this.roomid);
        this.server.on("record-permission",(msg)=>{
            resolve(msg);
        })
        })

    }
}