"use client"
import { Circle, Mic, Pause, Phone, Video } from "lucide-react"
import { webrtcmanager } from "../webrtc/rtcmanager"
import { RefObject, useEffect } from "react"
import { Recording } from "../webrtc/recording"
type ControlBarData = {data:{
    manager: webrtcmanager | null;
    localvid: RefObject<HTMLVideoElement|null>;
    recorderref: RefObject<ReturnType<typeof Recording> | null>;
}
};
const cv= {button: "py-4 rounded-full bg-white text-white border border-gray-200 px-6 "}

export const ControlBar=({data}:ControlBarData)=>{
    const {manager,localvid,recorderref} = data
        const togglevideo=()=>{
      if(localvid)
                return manager?.togglevideo()
    }

    const toggleaudio=()=>{
      if(localvid)
                return  manager?.toggleaduio()
    }

    const hangup=()=>{
      manager?.hangup()
    }

    // starts recording after the response is yes
    const startvideo=async()=>{
      if(manager){
        const response = await manager.record_permission();
        if(response){
          recorderref.current?.startrecording();
        console.log(recorderref);
        }

        else{

        }
      }
    }

    const videoStop=async()=>{
      if(!recorderref.current) return 
      if(manager)
      manager.endrecording();
      const {videoUrl, videoBlob} = await recorderref.current?.stopRecording()
      window.open(videoUrl)
    }

    return <>
    <div className=" gap-4 py-6 flex justify-center bottom-13 border-t bg-[#f7f7f7]">
              <button className={cv.button} onClick={togglevideo} >
                <Video color="#727272" size={20}/></button>
              <button className={cv.button} onClick={toggleaudio}>
                <Mic color="#727272" size={20}/></button>
              <button className={cv.button} onClick={hangup}>
                <Phone color="#727272" size={20}/></button>
              <button className={cv.button} onClick={startvideo}>
                <Circle color="#727272" size={20}/></button>
              <button className={cv.button} onClick={videoStop}>
                <Pause color="#727272" size={20}/></button>
            </div>
    </>
} 