import { Construction } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { rtc } from "./logic";

 interface chats{
          user:"user1"|"user2",
          msg:string
        }

class Webrtcmanager{
    public localstream:MediaStream|undefined;
    public remotestream:MediaStream|undefined;
    private server :Socket
    private currtc:rtc|undefined
    private roomid:string
    constructor(roomid:string){
        this.server = io("http://localhost:3001");
        this.setuplistners();
        this.roomid = roomid
    }
    public chats:chats[] | undefined

    Connect(tracks:MediaStream,action:"join"|"create",roomid?:string,){
            this.currtc = new rtc(tracks,this.server)

            if(roomid  && roomid != "none" && this.currtc){ this.currtc.roomid = roomid}

            if(action == "create"  && roomid != "none"){
                    const res = this.server.emit("create")
                }else if(action == "join" && roomid != "none"){
                    const res = this.server.emit("join",{roomid})
            }

            if(!this.server.hasListeners("roomid")){
                this.server.on("room-closed",()=>this.closeroom())
                this.server.on("roomid",(roomid,userno)=>{if(this.currtc)this.currtc.roomid = roomid})
                this.server.on("msg",(data)=> {
                    if(this.chats)
                    this.chats.push({user:"user2",msg:data});
                })

            }
        } 

    setuplistners(){
        if(this.currtc != undefined){
            this.server.on("send-offer",(data)=>  this.currtc?.createPeerConnection(true,data.roomid))
            this.server.on("Offer",(msg) =>  this.currtc?.handleVideoOfferMsg(msg))
            this.server.on("answer",(msg) => this.currtc?.handleVideoAnswerMsg(msg))
            this.server.on("new-ice-candidate",(msg) => this.currtc?.handleNewICECandidateMsg(msg))
            this.server.on("askstart",()=>{ })
        }
    }

    async getmeida(){
        if(!this.localstream){
            this.localstream = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
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
            this.Connect(this.localstream,"create")
        }
    }
                
    joinroom=()=>{
        if(this.localstream){
        this.Connect(this.localstream,"join",this.roomid)
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
        if(this.chats){
            const roomid = this.roomid
            this.server.emit("msg",{roomid,msg})
            this.chats.push({user:"user1",msg:msg});
        }
    }

    closeroom(){
        this.currtc?.closeVideoCall()
        this.server.close()
        this.roomid = "none"
    }

}