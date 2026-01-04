"use client"
import { useEffect, useRef, useState } from "react";
import { useParams  } from 'next/navigation';
import Chatbox from "../../components/chatbox";
import { Recording } from "../../webrtc/recording";
import { rtcengine } from "../../webrtc/connectionlogic";
import { webrtcmanager } from "../../webrtc/rtcmanager";
import { ControlBar } from "@/app/components/ControlBar";
import { Header } from "@/app/components/Header";
 
export default function Room() {
  const param = useParams ();
  const room = param.roomid;
    const recorderref = useRef<ReturnType<typeof Recording> | null>(null);
    const localvid = useRef<HTMLVideoElement | null>(null)
    const [localmedia,setlocalmedia] = useState<MediaStream|null>(null)
    const [roomid,setroomid] = useState<string|null>(null);
    const [manager,setmanager] = useState<webrtcmanager|null>(null)
    const [reqcall,setreqcall] = useState(false);

    useEffect(()=>{
        if(!roomid && room &&  typeof room == "string") {
            setroomid(room)       
        }
    },[room])

    useEffect(()=>{
      if(!roomid)return
      setmanager(()=>rtcengine());
    },[roomid])

    useEffect(()=>{
        if(!manager) return
        async function fetchmedia(){
            const MediaStream =await manager?.getmeida();
            if(MediaStream && localvid.current && roomid){
                setlocalmedia(MediaStream);
                localvid.current.srcObject = MediaStream;
                manager?.joinroom(roomid);
                manager?.setcallback(setcallback,videoStop);
            }
        }
        fetchmedia()
        return manager?.setcallback(undefined)
    },[manager])

    useEffect(()=>{
        const rec=()=>{
            if(!recorderref.current  && typeof room === "string" && localmedia){
                recorderref.current =  Recording(localmedia,room);
              }
        }
        rec();
    },[localmedia])

    const setcallback=(data:boolean)=>{
      setreqcall(data)
    }
    
    const videoStop=async()=>{
      if(!recorderref.current) return 
      const {videoUrl, videoBlob} = await recorderref.current?.stopRecording()
      window.open(videoUrl)
    }

   // starst recording , after clicking yes 
    const triggerRecord=()=>{
      recorderref.current?.startrecording()
    }

  return (
    <>
      <div className="relative w-screen h-screen bg-white flex flex-col ">    
        {/* < div className=" absolute top-2 left-1/2 transform -translate-x-1/2 w-[250px] h-[55px] border rounded-md bg-white border-black/30 flex px-4 items-center">
        Request sent to record
        </div> */}
        {reqcall && < div className="z-2 absolute top-2 left-1/2 transform -translate-x-1/2 w-[250px] h-fit  border rounded-md bg-white border-black/30 flex px-4 py-3 items-center flex-col gap-4">
         Host wants to record the Podcast. Do you want to ?
         <div className="w-full flex justify-end gap-2">
         <button
          onClick={()=>{
            manager?.permissionResponse(false);
            setreqcall(false);
          }}
          className="bg-red-400 px-3 py-1 rounded-[3px]">no</button>
         <button 
         onClick={()=>{
          manager?.permissionResponse(true);
          triggerRecord();
         }}
         className="bg-gray-300 px-3 py-1 rounded-[3px]">yes</button>
         </div>
        </div>}
        <Header tittle="Podster" size="lg"/>
        <div className="w-full h-full bg-[#f7f7f7] flex">
        <div className="flex flex-col ">
          <div className="relative  min-w-[75%] h-full flex pt-10 justify-center gap-8 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className="bg-white w-[45%] h-[70%] rounded-xl overflow-hidden">
              <video className="w-full h-full rounded-md" autoPlay ref={localvid}></video>
            </div>
            <div className="bg-white w-[45%] h-[70%] rounded-xl overflow-hidden">
              <video className="w-full h-full" autoPlay id="remote"></video>
            </div>
          </div>
          <div>
          <ControlBar data={{manager,localvid,recorderref}}/>
          </div>
        </div>
        <Chatbox/>
        </div>
      </div>
    </>
  );
}