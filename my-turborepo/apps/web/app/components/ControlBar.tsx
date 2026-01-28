"use client"
import { Circle, MessageCircle, Mic, Pause, Phone, Video } from "lucide-react"
import { webrtcmanager } from "../webrtc/rtcmanager"
import { RefObject, useState } from "react"
import { Recording } from "../webrtc/recording"
import { useChat, useRecording } from "../store"
import { Popup } from "./popup"
type ControlBarData = {data:{
    manager: webrtcmanager | null;
    localvid: RefObject<HTMLVideoElement|null>;
    recorderref: RefObject<ReturnType<typeof Recording> | null>;
}};
const cv= {button: "py-4 rounded-full  text-white border border-gray-200 px-6"}
export const ControlBar=({data}:ControlBarData)=>{
  //zustand recording state 
    const chat = useChat((state)=>state.chat)
    const chattoggle = useChat((state)=>state.togglechat)
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
            <Popup tittle="Still Recoding" state={showrecording}/>
            <Popup tittle="Permission denied" state={showpermission}/>
            <Popup tittle="Recording Started" state={startedrec}/>
            <Popup tittle="Recording Request sent" state={requestsent}/>
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
                 <button className={`${cv.button} ${chat ? "bg-white": "bg-red-500" }`}
                 onClick={()=>{
                  console.log(chat);
                  chattoggle()}}>
                  <MessageCircle color={chat ?"#727272":"white"} size={20} />
                 </button>
            </div>
    </>
}