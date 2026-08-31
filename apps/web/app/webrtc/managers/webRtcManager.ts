import { chatManager } from "./chatManager";
import { mediaManager } from "./mediaManager";
import { RecordingManager } from "./recordingmanager";
import { rtcmanage } from "./rtc";
import { socketManager } from "./socketmanager";

export class Manager {
    public socket: socketManager;
    public media: mediaManager;
    public chat: chatManager;
    public recording!: RecordingManager;
    public rtcmanage: rtcmanage | undefined;
    public videoStop?: () => () => Promise<void>
    constructor(public roomid: string, public onRemoteStream: (media: MediaStream) => void, public onUserConnected: (value: boolean) => void, public onIsLocalVideoEnabled: (state: boolean) => void, public onIsRemoteVideoEnabled: (state: boolean) => void, public onshowPermissionBox: () => void) {
        this.socket = new socketManager(this.roomid);
        this.media = new mediaManager(this.onIsLocalVideoEnabled, this.onIsRemoteVideoEnabled);
        this.chat = new chatManager(this.socket, this.roomid);
        this.recording = new RecordingManager(this.socket, this.roomid, this.onshowPermissionBox);
        this.mediaListnersSetup();
    }

    async create() {
        this.socket.connect()
        this.rtcmanage = new rtcmanage(this.socket, this.getmedia, this.onRemoteStream, this.onUserConnected, this.roomid);
        await this.rtcmanage.intialize();   
        this.socket.join();
        this.socket.on("hangup", () => {
            this.hangup()
        })
        console.log("socket connect");
        return
    }

    getmedia = async () => {
        return await this.media.getmedia();
    }

    togglevideo() {
        const state = this.media.togglevideo();
        this.socket.emit("video-state", { state });
    }

    toggleaudio() {
        this.media.toggleaduio();
    }

    hangup() {
        console.log("hangup called");
        this.media.stop();
        this.rtcmanage?.closeRtc();
        this.socket.dissconnect();
    }

    mediaListnersSetup() {
        this.socket.on("video-state", (data) => {
            this.onIsRemoteVideoEnabled(data.state)
        });
    }

}