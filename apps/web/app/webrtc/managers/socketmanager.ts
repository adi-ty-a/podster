import { io, Socket } from "socket.io-client";
export class socketManager{
    public socket:Socket|undefined;
    constructor(public roomid:string){}
    
    connect():Socket{
        this.socket =  io(process.env.NEXT_PUBLIC_SOCKET_URL,{withCredentials:true,transports: ["websocket"]});
        this.socket.on("connect", () => {
        });
        return this.socket
    }

    join=()=>{
        if(!this.socket) return
        this.socket.emit("join",this.roomid);
    }

    dissconnect(){
        if(!this.socket) return
        this.socket.disconnect();
    }

    emit(event:string,data?:any){
        if(!this.socket) return
        this.socket.emit(event,data);
    }

    on(event:string,callback:(data:any)=>void){
        if(!this.socket) return
        this.socket.on(event,callback);
    };

    off(event: string, callback: (data: any) => void) {
        this.socket?.off(event, callback);
    }

}