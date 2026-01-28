"use client"
import { useEffect, useRef, useState } from "react";
import { useParams  } from 'next/navigation';
import Chatbox from "../../../components/chatbox";
import { Recording } from "../../../webrtc/recording";
import { rtcengine } from "../../../webrtc/connectionlogic";
import { webrtcmanager } from "../../../webrtc/rtcmanager";
import { ControlBar } from "@/app/components/ControlBar";
import { Header } from "@/app/components/Header";
import { AnimatePresence, motion, scale } from "motion/react"
import PersonIcon from '@mui/icons-material/Person';
import { useChat, useRecording, useRooom } from "@/app/store";

export default function Room() {
  const param = useParams ();
  const room = param.roomid;
  const roomname = param.Roomname;
  const setroomname = useRooom((state)=>state.setroomname)  
  const recorderref = useRef<ReturnType<typeof Recording> | null>(null);
  const localvid = useRef<HTMLVideoElement | null>(null);
  const remotevid = useRef<HTMLVideoElement | null>(null);
  const [localmedia,setlocalmedia] = useState<MediaStream|null>(null);
  const [roomid,setroomid] = useState<string|null>(null);
  const [manager,setmanager] = useState<webrtcmanager|null>(null);
  const [reqcall,setreqcall] = useState(false);
  const [userconnected,setuserconnected] = useState(false);
  const [remoteStream,setRemoteStream] = useState<MediaStream>()
  const [isRemoteVideoEnabled,setisRemoteVideoEnabled] = useState(true);
  const [islocalVideoEnabled,setisLocalVideoEnabled] = useState(true);
  const setisrecording = useRecording((state)=>state.setisrecording)
  const chat = useChat((state)=>state.chat)

  useEffect(()=>{
        if(!roomid && room &&  typeof room == "string" && roomname && typeof roomname == "string") {
            setroomid(room)      
            setroomname(roomname)
        }
    },[room])

    useEffect(()=>{
      if(!roomid)return
      setmanager(()=>rtcengine());
      return ()=>{
        manager?.hangup
      }
    },[roomid])

    useEffect(()=>{
        if(!manager) return
        async function fetchmedia(){
            const MediaStream =await manager?.getmeida();
            if(MediaStream && localvid.current && roomid){
                setlocalmedia(MediaStream);
                localvid.current.srcObject = MediaStream;
                manager?.setcallback(setcallback,videoStop,setuserconnected,Remotestream,setisRemoteVideoEnabled,setisLocalVideoEnabled);
                manager?.joinroom(roomid);
            }
        }
        fetchmedia()
    },[manager])

    useEffect(()=>{
        const rec=()=>{
            if(!recorderref.current  && typeof room === "string" && localmedia){
                recorderref.current =  Recording(localmedia);
              }
        }
        rec();
    },[localmedia])

    useEffect(()=>{
      if(remoteStream && remotevid.current){
        remotevid.current.srcObject=remoteStream
      }
    },[remoteStream])
    

    const setcallback=(data:boolean)=>{
      setreqcall(data)
    }


    const videoStop=async()=>{
      if(!recorderref.current)  return console.log("ruk gya") 
      const {videoUrl} = await recorderref.current?.stopRecording()
      window.open(videoUrl)
    }

   // starst recording , after clicking yes 
    const triggerRecord=()=>{
      recorderref.current?.startrecording()
    }

    function Remotestream(media:MediaStream){
      setRemoteStream(media)
    }
    

    const renderRemoteVideo = () => {
        if (!userconnected) {
          return "User not connected...";
        }

        if (!isRemoteVideoEnabled) {
          return (
            <div className=" relative h-full w-full flex items-center justify-center">
                    <video  className="w-full h-full object-cover" autoPlay ref={remotevid} id="remote" ></video>
                    <div className="absolute w-full h-full flex items-center justify-center bg-white">
                      <div className="w-fit h-fit rounded-full bg-[#F2F2F2] p-5  shadow-[0_3px_5px_rgb(0,0,0,0.1)]">
                        <PersonIcon style={{color:"black",fontSize: "200px" }}/>
                      </div>
                      </div>
                  </div>
                );     
              };
        return (
                <div className=" relative h-full w-full flex items-center justify-center">
                  <video  className="w-full h-full object-cover" autoPlay ref={remotevid} id="remote" ></video>
                </div>
            );
        }

        

    const renderLocalvideeo=()=>{
      if(!islocalVideoEnabled){
        return <div className=" relative h-full w-full flex items-center justify-center border border-black/10 ">
                          <video  className="w-full h-full object-cover shadow-[0_3px_5px_rgb(0,0,0,0.1)]" autoPlay ref={remotevid} id="remote" ></video>
                          <div className="absolute w-full h-full flex items-center justify-center bg-white shadow-[0_3px_15px_rgb(0,0,0,0.8)]">
                            <div className="w-fit h-fit rounded-full bg-[#F2F2F2] p-5  shadow-[0_3px_5px_rgb(0,0,0,0.1)]">
                              <PersonIcon style={{color:"black",fontSize: "80px" }}/>
                            </div>
                            </div>
                        </div> 
      }
        return <div className=" relative h-full w-full flex items-center justify-center">
           <video  className="w-full h-full object-cover" autoPlay ref={localvid} ></video>
          </div>
      
    }

    const renderChat=()=>{
      if(userconnected){
        return   chat && <Chatbox/>
      }
    }

  return (
    <>
      <div className="relative w-screen h-screen bg-white flex flex-col ">    
        <AnimatePresence>
        {reqcall &&
        < motion.div 
        initial={{
          y:-100,
          opacity:0
         }}
         animate={{
          y:0,
          opacity:100
         }}
         exit={{
          y:-100,
          opacity:0
         }}
         transition={{
          duration:.4
         }}
        className="z-2 absolute top-2 left-1/2 transform -translate-x-1/2 w-[250px] h-fit  border rounded-md bg-white border-black/30 flex px-4 py-3 items-center flex-col gap-4">
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
          setisrecording(true);
          setreqcall(false);
         }}
         className="bg-gray-300 px-3 py-1 rounded-[3px]">yes</button>
         </div>
        </motion.div>
        }
        </AnimatePresence>
        <Header tittle="Podster" size="lg"/>
        <div className="w-full h-full bg-[#f7f7f7] flex">
        <div className="flex flex-col  h-full flex-1">
          <div className="relative  min-w-[75%] h-full flex py-5 justify-center gap-8 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div  className="relative bg-white aspect-video h-[100%] rounded-xl overflow-hidden flex items-center justify-center ">
              {renderRemoteVideo()}
            <div className="z-3 absolute bottom-2 right-2 bg-white aspect-video h-[30%] rounded-xl overflow-hidden">
              {renderLocalvideeo()}
            </div>
            </div>
          </div>
          <div>
            { userconnected && <ControlBar data={{manager,localvid,recorderref}}/>
            }
          </div>
        </div>
        {renderChat()}
        </div>
      </div>
    </>
  );
}