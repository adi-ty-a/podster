"use client"
import { Circle, Mic, Pause, Phone, Video } from "lucide-react"
import { webrtcmanager } from "../webrtc/rtcmanager"
import { RefObject, useState } from "react"
import { Recording } from "../webrtc/recording"
import { AnimatePresence, motion } from "motion/react"
import { useRecording } from "../store"
type ControlBarData = {data:{
    manager: webrtcmanager | null;
    localvid: RefObject<HTMLVideoElement|null>;
    recorderref: RefObject<ReturnType<typeof Recording> | null>;
}};
const cv= {button: "py-4 rounded-full  text-white border border-gray-200 px-6"}
export const ControlBar=({data}:ControlBarData)=>{
  //zustand recording state 
  
    const isrecording = useRecording((state)=>state.isrecording)
    const setisrecording = useRecording((state)=>state.setisrecording)
    const [camera,setcamera] = useState(true);
    const [mic,setmic] = useState(true);
    const [showrecording,setrshowrecording] = useState(false);
    const [showpermission,setshowpermission] = useState(false);
    const [startedrec,setstartedrec] = useState(false);
    const [disableRecordButton,setdisableRecordButton]  = useState(false);
    const [requestsent,setrequestsent] = useState(false);
    const {manager,localvid,recorderref} = data;

    const togglevideo=()=>{
      if(localvid){
          setcamera(!camera);
          return manager?.togglevideo()
        }
    }
    const toggleaudio=()=>{
      if(localvid){
        setmic(!mic)
        return  manager?.toggleaduio()
      }
    }
    const hangup=()=>{
      if(!isrecording){
        manager?.hangup()
      }else{
        setrshowrecording(true);
        setTimeout(() => {
          setisrecording(false);
        }, 10000);
      }
    }
    // starts recording after the response is yes
    const startvideo=async()=>{
      if(manager){
        setrequestsent(true) 
        setTimeout(() => {setrequestsent(false);}, 10000);

        const res = await manager.record_permission();
        console.log(res.permission);
        const resvalue = res.permission;
        if(resvalue){
          setdisableRecordButton(false);
          recorderref.current?.startrecording();
          setstartedrec(true);
          setTimeout(() => {setstartedrec(false)}, 10000);
        }
        else if(!resvalue){
          setdisableRecordButton(false);
          setisrecording(false);
          setshowpermission(true);
          setTimeout(() => {setshowpermission(false);}, 10000);
        }
      }
    }
    const videoStop=async()=>{
      if(!recorderref.current) return 
      if(manager){
        manager.endrecording();
      }
        const {videoUrl, videoBlob} = await recorderref.current?.stopRecording()
      window.open(videoUrl);
    }

    return <>
    <div className="relative gap-4 py-4 flex justify-center bottom-0 border-t bg-[#f7f7f7]">
      <AnimatePresence>
            {showrecording && 
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
            <AnimatePresence>
            {showpermission && 
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
              className="-top-14 absolute bg-[#1F2224] h-fit w-[170px] px-4 py-4 text-white rounded-[12px] flex items-center">Permission denied</motion.div>
            }
            </AnimatePresence>
            <AnimatePresence>
            {startedrec && 
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
              className="-top-14 absolute bg-[#1F2224] h-fit w-[180px] px-4 py-4 text-white rounded-[12px] flex items-center">
                <div>Recording Started</div>
                <div className=" absolute right-3 size-[15px] rounded-full bg-red-400 animate-pulse"></div>
              </motion.div>
            }
            </AnimatePresence>
            <AnimatePresence>
            {requestsent && 
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
              className="-top-14 absolute bg-[#1F2224] h-fit w-[220px] px-4 py-4 text-white rounded-[12px] flex items-center">
                <div>Recording Request sent</div>
                <div className=" absolute right-3 size-[15px] rounded-full bg-red-400 animate-pulse"></div>
              </motion.div>
            }
            </AnimatePresence>
              <button className={`${cv.button} ${camera ? "bg-white": "bg-red-500" }`} onClick={togglevideo} >
                <Video color={camera ? "#727272" :"white" }/></button>
              <button className={`${cv.button} ${mic ? "bg-white": "bg-red-500" }`} onClick={toggleaudio}>
                <Mic color={mic ? "#727272" :"white" } size={20}/></button>
              <button className={`${cv.button} bg-red-500`} onClick={hangup}>
                <Phone color="white" size={20}/></button>
              <button
                disabled={disableRecordButton}
                className={`${cv.button} ${isrecording ? "bg-red-500" :"bg-white"}`} onClick={()=>{
                setdisableRecordButton(true);
                setisrecording(!isrecording);
                return isrecording ? videoStop() :startvideo() }}>
                <Circle color={isrecording ? "white":"#727272" } size={20}/></button>
            </div>
    </>
}