"use client"
import { useEffect, useRef, useState } from "react";
import { Connect } from "../../webrtc/onconnect";

export default function Room() {
    const localvid = useRef<HTMLVideoElement>(null)
    const remotevid = useRef<HTMLVideoElement>(null)
    const [roomid,setroomid] = useState("")
    const [videotrack,setvideostrack]=useState<MediaStreamTrack>()

    const  localstream = useRef<MediaStream >(null);
    const init = async()=>{
        localstream.current =  await navigator.mediaDevices.getUserMedia({video:true,audio:true})
        setvideostrack(localstream.current.getVideoTracks()[0])
    if ( localvid.current) {
    localvid.current.srcObject = localstream.current;
    }

    }
    useEffect(()=>{   
        init() 
        },[])

    const createroom=()=>{
      if(videotrack){
      Connect(videotrack,"create")
      }
    }

    const joinroom=()=>{
      if(videotrack){
      Connect(videotrack,"join",roomid)
      }
          
    }

  return (
    <>
      <div className="w-screen h-screen bg-gray-950  flex flex-col justify-center items-center gap-2">    
        <div className="w-[70vw] h-[60vh] flex justify-center items-center gap-2 ">
        <video className="w-[70vw] h-[50vh]" autoPlay ref={localvid}></video>
        <video className="w-[70vw] h-[50vh]" autoPlay id="remote"></video>
        </div>
        <div className="flex flex-col gap-3">
      <input className="h-[30px] p-6 rounded w-full border-2 border-white" onChange={(e)=> setroomid(e.target.value)} type="text" placeholder="roomid" />
      <div className="flex gap-2">
      <button className="w-[100px] p-[10px] rounded-full bg-blue-600 text-white"  onClick={joinroom}>join</button>
      <button className="w-[100px] p-[10px] rounded-full bg-blue-600 text-white"  onClick={createroom}>create</button>
      </div>
        </div>
      </div>
    </>
  );
}