"use client"
import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { Mic } from "lucide-react";
import { Video } from "lucide-react";
import { useWebrtc } from "../../webrtc/onconnect";
import { useParams  } from 'next/navigation'

export default function Room() {
    const localvid = useRef<HTMLVideoElement>(null)
    const LocalstreamRef = useRef<MediaStream | null>(null);
    const [roomid,setroomid] = useState<string>("")
    const param = useParams ()
    const room = param.roomid 
    const {joinroom,togglevideo,toggleaduio,Localstream,hangup} = useWebrtc(roomid)
    const joinref = useRef(false)
    useEffect(()=>{
    if(room && typeof room === "string"){
    setroomid(room)   
    }
    },[room])

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
      <div className="w-screen h-screen bg-gray-950  flex flex-col justify-center items-center gap-2">    
        <div className="w-[70vw] h-[60vh] flex justify-center items-center gap-2 ">
        <video className="w-[70vw] h-[50vh]" autoPlay ref={localvid}></video>
        <video className="w-[70vw] h-[50vh]" autoPlay id="remote"></video>
        </div>
        <div className="flex flex-col gap-3">
      <div className="flex gap-2 justify-center">
      <button className="p-2 rounded-full bg-blue-600 text-white" onClick={()=> { 
        if(LocalstreamRef.current)
        return togglevideo(LocalstreamRef.current)}} ><Video/></button>
      <button className="p-2 rounded-full bg-blue-600 text-white" onClick={()=> { 
        if(LocalstreamRef.current)
        return togglevideo(LocalstreamRef.current)}}><Mic/></button>
      <button className="p-2 rounded-full bg-blue-600 text-white" onClick={hangup}><Phone/></button>
      </div>
        </div>
      </div>
    </>
  );
}