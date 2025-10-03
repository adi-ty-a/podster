import { Socket } from "socket.io";
import type { user } from "./Usermanage.js";

let GlobalRoomId = 1

interface rooms {
    user1:user,
    user2?:user,
}

export class RoomManager {

    private Rooms :Map<string,rooms>;
    private roomid : string


    constructor(){
        this.Rooms = new Map<string, rooms>()
        this.roomid = "1"
    }

    createRooms(user1:user){
         this.roomid = this.generate().toString()
        this.Rooms.set(this.roomid,{
            user1,
        })
        
        return this.roomid
    }

    joinroom(roomid:string,user2:user){
        const room = this.Rooms.get(roomid);
        if(!room){
            return 
        }
        room.user2 = user2;
        this.Rooms.set(roomid,room);
        room.user1.socket.emit("send-offer",{
                type:"send-offer",
                roomid: this.roomid
            })
        return "Roomcreted"

    }

    onOffer(roomid:string, sdp :string){
        const user2 = this.Rooms.get(roomid)?.user2
        if(user2){
            user2.socket.emit("Offer",{
                sdp
            })
        }
    }

    onAnswer(roomid:string, sdp :string){
        const user1 = this.Rooms.get(roomid)?.user1
        console.log("user1"+user1);
        console.log(this.Rooms)
        console.log("roomid"+roomid)
        if(user1){
            user1.socket.emit("answer",{
                sdp
            })
        }
    } 

    onIceCandidate({roomid,candidate,socket}:{roomid:string,candidate:RTCIceCandidate,socket:Socket}){
        const room = this.Rooms.get(roomid)
        if(room){
            if (room.user1.socket.id === socket.id) {
        room.user2?.socket.emit("new-ice-candidate", { candidate });
        } else if (room.user2?.socket.id === socket.id) {
            room.user1.socket.emit("new-ice-candidate", { candidate });
        }
        }
    }

    generate(){
        return GlobalRoomId++;
    }
}