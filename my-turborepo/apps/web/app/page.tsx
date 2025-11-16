"use client";
import { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from 'next/navigation'
import { Dialog } from "./components/cardbox";

export default function Home() {
  const localvid = useRef<HTMLVideoElement>(null);
  let Localstream: MediaStream
  const router = useRouter()
  const roomid = uuid()

  const init = async () => {
    Localstream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localvid.current && Localstream) {
      localvid.current.srcObject = Localstream;
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
 
    <div className="bg-[#100512] w-screen h-screen  overflow-hidden text-white">
      <div className="flex justify-center items-center mt-[25vh] gap-6">
        <button className="bg-[#28002b] text-[#fad9fc] rounded-md w-fit h-fit px-2 py-3 shadow-[0_8px_30px_#18101a]" onClick={()=>{
          router.push("/room/"+roomid)
        }}>Create</button>
        <video autoPlay ref={localvid} className="h-[300px] rounded-xl"></video>
      </div>
    </div>
    </>
  );
}