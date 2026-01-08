import type { Socket } from "socket.io";
import { RoomManager } from "./room.js";

export interface user{
    socket:Socket,
    name:string,
}

export class User {
    private Users:user[];
    private roomhandler :RoomManager

    constructor(){
        this.Users = [];
        this.roomhandler =  new RoomManager();
    }
    adduser(name:string, socket:Socket){
        this.Users.push({name,socket});
    }

    removeuser(socketid:string){
        this.Users = this.Users.filter(x => x.socket.id !== socketid);
    }

    createroom(socket:Socket){
        const roomid =  this.roomhandler.createRooms({socket,name:"user1"});
        socket.data.roomid = roomid;
        socket.emit("roomid",roomid,"user1");
    }

    joinroom(socket:Socket,roomid:string){
        const res = this.roomhandler.joinroom(roomid,{socket,name:"user2"});
        socket.data.roomid = roomid;
        socket.emit("joined",res)
    }

    initHandler(socket:Socket){
        socket.on("msg",({roomid,msg})=>{
            console.log(roomid)
            this.roomhandler.onmessage({roomid,socket,msg});
        })

        socket.on("video-state",({state}:{state:boolean})=>{
            const roomid =socket.data.roomid
            this.roomhandler.handlevideostate({socket,state,roomid});
        })
        socket.on("offer",({roomid,sdp}:{roomid:string,sdp:string})=>{
            this.roomhandler.onOffer(roomid,sdp);
        })
        socket.on("answer",({roomid,sdp}:{roomid:string,sdp:string})=>{
            this.roomhandler.onAnswer(roomid,sdp);
        })
        socket.on("new-ice-candidate",({roomid,candidate}:{roomid:string,candidate:RTCIceCandidate})=>{
            this.roomhandler.onIceCandidate({roomid,candidate,socket});
        })
        socket.on("request-permission",({roomid}:{roomid:string})=>{
            this.roomhandler.requestingPermission({roomid,socket})
        })
        socket.on("permission-response",({roomid,permission}:{roomid:string,permission:boolean})=>{
            this.roomhandler.record_response({roomid,socket,permission})
        })
        socket.on("end_recording",({roomid}:{roomid:string})=>{
            this.roomhandler.endrecording({roomid,socket});
        })

        socket.on("hangup",async ({roomid}:{roomid:string})=>{
            await this.removeuser(socket.id)
            this.roomhandler.endcall({roomid,socket});
            socket.emit("room-closed")
        })

        socket.on("disconnect",(reason)=>{
            console.log(reason);
            this.removeuser(socket.id)
            const roomid = socket.data.roomid
            if(roomid){
                this.roomhandler.endcall({roomid,socket});
            }
        })
    }

}