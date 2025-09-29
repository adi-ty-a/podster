import type { Socket } from "socket.io";
import type { RoomManager } from "./room.js";

export interface user{
    socket:Socket,
    name:string,
}

export class User {
    private Users:user[];
    constructor(){
        this.Users = [];
    }
    adduser(name:string, socket:Socket){
        this.Users.push({name,socket});
    }

    removeuser(socketid:string){
        this.Users = this.Users.filter(x => x.socket.id !== socketid);
    }

    createroom(RoomManager:RoomManager,socket:Socket){
        const roomid = RoomManager.createRooms({socket,name:"adwadad"});
        socket.emit("creteroom",roomid)
    }

    joinroom( RoomManager:RoomManager,socket:Socket,roomid:string){
        const res = RoomManager.joinroom(roomid,{socket,name:"adwadad"});
        socket.emit("join",res)
    }

}