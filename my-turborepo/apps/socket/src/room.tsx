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
        console.log(this.Rooms)
        console.log(room)
        if(!room){
            return 
        }
        room.user2 = user2;
        this.Rooms.set(roomid,room);
        console.log(room)
        return "Roomcreted"
    }

    generate(){
        return GlobalRoomId++;
    }
}