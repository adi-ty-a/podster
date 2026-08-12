import { socketManager } from "./socketmanager";

export class chatManager{

    constructor(private socket:socketManager,public roomid:string){
    }

    sendmsg(msg:string){
        this.socket.emit("msg",{msg,roomid:this.roomid});
    }
    setCallback(callback:(data:any)=>void){
        this.socket.on("msg",callback);
    }
    removeCallback(callback:(data:any)=>void){
        this.socket.off("msg",callback);
    }} 