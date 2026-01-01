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
        socket.emit("roomid",roomid,"user1");
    }

    joinroom(socket:Socket,roomid:string){
        const res = this.roomhandler.joinroom(roomid,{socket,name:"user2"});
        socket.emit("joined",res)
    }

    initHandler(socket:Socket){
        socket.on("msg",({roomid,msg})=>{
            console.log(roomid)
            this.roomhandler.onmessage({roomid,socket,msg});
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
        socket.on("request-permission",({roomid,socket}:{roomid:string,socket:Socket})=>{
            this.roomhandler.record_response({roomid,socket})
        })
        socket.on("permission-response",({roomid,socket,permission}:{roomid:string,socket:Socket,permission:boolean})=>{
            this.roomhandler.record_response({roomid,socket,permission})
        })
        socket.on("hangup",async ({roomid}:{roomid:string})=>{
            await this.removeuser(socket.id)
            socket.emit("room-closed")
        })
    }

}