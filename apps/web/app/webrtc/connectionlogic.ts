import { webrtcmanager } from "./rtcmanager"
 let manager:webrtcmanager |null = null
export const rtcengine = () => {
    if(!manager ){
        manager = new webrtcmanager();
    }
    return manager;
};