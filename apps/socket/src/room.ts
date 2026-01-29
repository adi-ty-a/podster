import { Socket } from "socket.io";
export interface user{
    socket:Socket,
    name:string,
}

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
        this.Rooms.set(this.roomid,{
            user1,
        })
        return this.roomid
    }

    joinroom(roomid:string,user:user){
        this.roomid= roomid
        const room = this.Rooms.get(roomid);
        if(!room){
            this.createRooms(user)
            return "Roomcreted"
        }else{
        room.user2 = user;
        this.Rooms.set(roomid,room);
        room.user1.socket.emit("send-offer",{
                type:"send-offer",
                roomid: this.roomid
            })
        return "roomjoined"
        }
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
        if(user1){
            user1.socket.emit("answer",{
                sdp
            })
        }
    } 

    onIceCandidate({roomid,candidate,socket}:{roomid:string,candidate:RTCIceCandidate,socket:Socket}){
        const room = this.Rooms.get(roomid);
        if(room){
            if (room.user1.socket.id === socket.id) {
        room.user2?.socket.emit("new-ice-candidate", { candidate });
        } else if (room.user2?.socket.id === socket.id) {
            room.user1.socket.emit("new-ice-candidate", { candidate });
        }
        }
    }

    onmessage({roomid,socket,msg}:{roomid:string,socket:Socket,msg:string}){
        const room = this.Rooms.get(roomid);
        console.log("room found ?")
        console.log(room)
        console.log(this.Rooms);
        if(room){
            if(socket.id == room.user1.socket.id){
                room.user2?.socket.emit("msg",msg);
            }else if(socket.id == room.user2?.socket.id){
                room.user1.socket.emit("msg",msg);
            }
        }
    }

    onleave({roomid}:{roomid:string}){
        this.Rooms.delete(roomid)
    }

    requestingPermission({roomid,socket}:{roomid:string,socket:Socket}){
        const room = this.Rooms.get(roomid)
        if(room){
            const user = Object.values(room).find(u => u.socket.id != socket.id)
            if (!user) return;
                user.socket.emit("record-permission");

        }
    }

    record_response({roomid,socket,permission}:{roomid:string,socket:Socket,permission:boolean}){
        const room = this.Rooms.get(roomid)
        console.log(socket.id);
        if(room){
            const user = Object.values(room).find(u => u.socket.id != socket.id)
            if (!user) return;
                user.socket.emit("record-response",{permission});
        }
    } 

    endrecording({roomid,socket}:{roomid:string,socket:Socket}){
        const room = this.Rooms.get(roomid)
        console.log(socket.id);
        if(room){
            const user = Object.values(room).find(u => u.socket.id != socket.id)
            if (!user) return;
                user.socket.emit("end_recording");
        }
    } 
    endcall({roomid,socket}:{roomid:string,socket:Socket}){
        const room = this.Rooms.get(roomid)
        if(room){
            const user = Object.values(room).find(u => u.socket.id != socket.id)
            if (user){
                return user.socket.emit("hangup");
                }else{
                     return socket.emit("no user in room or no room found");
                 }
        }
    }

    handlevideostate({socket,roomid,state}:{socket:Socket,roomid:string,state:boolean}){
        const room = this.Rooms.get(roomid);
        if(!room) return 
        const user = Object.values(room).find((s)=> s.socket.id != socket.id)
        if(user){
            user.socket.emit("video-state",{state});
        }else{
            socket.emit("no user found")
        }

    }   

    generate(){
        return GlobalRoomId++;
    }
}