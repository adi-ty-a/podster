import { socketManager } from "./socketmanager";

export class RecordingManager {
    constructor(private socket: socketManager,private roomid:string, public onshowPermissionBox:()=>void) {
        this.socket.on("record-permission",this.onshowPermissionBox);
    }

    requestPermission():Promise<any>{
        return new Promise((resolve)=>{
            if(this.roomid)
                this.socket.emit("request-permission",{roomid :this.roomid});
                this.socket.on("record-response",(msg)=>{
                resolve(msg);
            })
        })
    }

    permissionResponse(permission:boolean) {
        this.socket.emit("permission-response",{roomid:this.roomid,permission:permission});

    }
    
    endRecording() {
        console.log("this called");
        this.socket.emit("end_recording",{roomid:this.roomid});
    }

    setupEndRecordingListener=(cb:()=>Promise<void>)=>{
        console.log("listner set")
        this.socket.on("end_recording",cb);
    }

    removeEndRecordingListener=(cb:()=>Promise<void>)=>{
        console.log("listner removed")
        this.socket.off("end_recording",cb);
    }


}