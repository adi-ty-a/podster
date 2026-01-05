"use client"
import { Circle, Mic, Pause, Phone, Video } from "lucide-react"
import { webrtcmanager } from "../webrtc/rtcmanager"
import { RefObject, useEffect, useState } from "react"
import { Recording } from "../webrtc/recording"
import { AnimatePresence, motion } from "motion/react"

type ControlBarData = {data:{
    manager: webrtcmanager | null;
    localvid: RefObject<HTMLVideoElement|null>;
    recorderref: RefObject<ReturnType<typeof Recording> | null>;
}
};
const cv= {button: "py-4 rounded-full bg-white text-white border border-gray-200 px-6 "}

export const ControlBar=({data}:ControlBarData)=>{
    const [isrecording,setisrecording] = useState(false);

    setTimeout(() => {
        setisrecording(false);
    }, 10000);

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
      if(isrecording){
        
      }
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
    <div className="relative gap-4 py-6 flex justify-center bottom-13 border-t bg-[#f7f7f7]">
      <AnimatePresence>
            {isrecording && 
              <motion.div 
              initial={{
                y:50,
                opacity:0
              }}
              animate={{
                y:0,
                opacity:100
              }}
              exit={{
                y:50,
                opacity:0
              }}
              transition={{
                duration:.4
              }}
              className="-top-14 absolute bg-[#1F2224] h-fit w-[140px] px-4 py-4 text-white rounded-[12px] flex items-center">
                <div>Still Recoding</div>
                <div className=" absolute right-2 size-[15px] rounded-full bg-red-400 animate-pulse"></div>
              </motion.div>
            }
            </AnimatePresence>
              <button className={cv.button} onClick={togglevideo} >
                <Video color="#727272" size={20}/></button>
              <button className={cv.button} onClick={toggleaudio}>
                <Mic color="#727272" size={20}/></button>
              <button className={cv.button} onClick={hangup}>
                <Phone color="#727272" size={20}/></button>
              <button className={cv.button} onClick={()=>{
                        setisrecording(true);
                return startvideo()}}>
                <Circle color="#727272" size={20}/></button>
              <button className={cv.button} onClick={videoStop}>
                <Pause color="#727272" size={20}/></button>
            </div>
    </>
} 