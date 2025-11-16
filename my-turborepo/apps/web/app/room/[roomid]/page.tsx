"use client"
import { useEffect, useRef, useState } from "react";
import { Circle, Pause, Phone } from "lucide-react";
import { Mic } from "lucide-react";
import { Video } from "lucide-react";
import { useWebrtc } from "../../webrtc/onconnect";
import { useParams  } from 'next/navigation'
import Chatbox from "../../components/chatbox";
import { Recording } from "../../components/recording";
import { Dialog } from "../../components/cardbox";

export default function Room() {
    const recorderref = useRef<ReturnType<typeof Recording> | null>(null)
    const localvid = useRef<HTMLVideoElement>(null)
    const LocalstreamRef = useRef<MediaStream | null>(null);
    const [roomid,setroomid] = useState<string>("")
    const param = useParams ()
    const [dialog,setdialog] = useState(false)
    const room = param.roomid 
    const {joinroom,togglevideo,toggleaduio,Localstream,hangup,sendmsg,chats} = useWebrtc(roomid)

    const joinref = useRef(false)

    useEffect(()=>{
      if(Localstream && !recorderref.current && room && typeof room === "string"){
        recorderref.current = Recording(Localstream,room);
      }
    },[Localstream])

    useEffect(()=>{
    if(room && typeof room === "string"){
    setroomid(room)   
    }
    },[room])

    const showdialog= ()=>{
      setdialog(true);
    }
    

    const videoStop=async()=>{
      if(!recorderref.current) return 
      const {videoUrl, videoBlob} = await recorderref.current?.stopRecording()
      window.open(videoUrl)
      console.log(videoUrl);
      console.log(videoBlob)
    }

// localstream updates multiple time but rtc in onconnection takes only the first one , LocalstreamRef hold the first stream which is passed to the toggle funtions 

useEffect(()=>{
            if (Localstream && !joinref.current ) {
              joinref.current = true
              localvid.current!.srcObject = Localstream;
              LocalstreamRef.current = Localstream
              console.log(Localstream)
              joinroom()
    }
},[Localstream])


  return (
    <>
    {dialog ?? <Dialog/>}
      <div className="w-screen h-screen bg-white flex flex-col items-center">    
        <div className="flex pl-8 justify-between items-center w-full h-[10vh] bg-white border-b-2 border-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="text-black text-4xl ">Podster</div>
          <div className="flex justify-between items-center gap-6 pr-8">
          <div>share</div>
          <div>Home</div>
          </div>
        </div>
        <div className="w-full h-[90%] flex justify-around px-6 items-center">
        <div className="relative bg-[#F2F2F2] w-[75%] h-[90%] flex pt-10 justify-center gap-8 rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="bg-white w-[45%] h-[70%] rounded-xl overflow-hidden">
            <video className="w-full h-full rounded-md" autoPlay ref={localvid}></video>
          </div>
          <div className="bg-white w-[45%] h-[70%] rounded-xl overflow-hidden">
            <video className="w-full h-full" autoPlay id="remote"></video>
          </div>
            <div className="absolute gap-4 flex justify-center bottom-13 ">
              <button className="p-4 rounded-full bg-[#1F2224] text-white " onClick={()=> { 
                if(LocalstreamRef.current)
                return togglevideo(LocalstreamRef.current)}} >
                <Video size={32}/></button>
              <button className="p-4 rounded-full bg-[#1F2224] text-white" onClick={()=> { 
                if(LocalstreamRef.current)
                return toggleaduio(LocalstreamRef.current)}}>
                <Mic size={32}/></button>
              <button className="p-4 rounded-full bg-[#1F2224] text-white" onClick={hangup}>
                <Phone size={30}/></button>
              <button className="p-4 rounded-full bg-[#1F2224] text-white" onClick={recorderref.current?.startrecording}>
                <Circle size={30}/></button>
              <button className="p-4 rounded-full bg-[#1F2224] text-white" onClick={videoStop}>
                <Pause size={30}/></button>
            </div>
        </div>
        <Chatbox props = {{sendmsg,chats}}/>
        </div>
      </div>
    </>
  );
}