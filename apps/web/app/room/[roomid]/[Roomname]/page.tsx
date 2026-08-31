"use client"
import { useEffect, useRef, useState } from "react";
import { useParams } from 'next/navigation';
import Chatbox from "../../../components/chatbox";
import { Recording } from "../../../webrtc/recording";
import { ControlBar } from "./component/ControlBar";
import { Header } from "@/app/components/Header";
import { useChat, useRecording, useRooom, useVideoRender } from "@/app/store";
import { UploadingIndicator } from "@/app/components/uploadingIndicator";
import { RenderRemoteVideo, RenderLocalvideo } from "./renderVideoLogic.ts/renderVideoLogic";
import { Premission } from "./component/permissionDialog";
import { Manager } from "@/app/webrtc/managers/webRtcManager";

export default function Room() {
  const param = useParams();
  const room = param.roomid;
  const setRoomid = useRooom((state) => state.setrooId);
  const roomid = useRooom((state) => state.roomId);
  const recorderref = useRef<ReturnType<typeof Recording> | null>(null);
  const localvid = useRef<HTMLVideoElement | null>(null);
  const remotevid = useRef<HTMLVideoElement | null>(null);
  const [localmedia, setlocalmedia] = useState<MediaStream | null>(null);
  const [manager, setmanager] = useState<Manager | null>(null);
  const [showPermissionBox, setshowPermissionBox] = useState(false);
  const [userconnected, setuserconnected] = useState(false);
  const [remoteStream, setRemoteStream] = useState<MediaStream>()
  const { setisRemoteVideoEnabled, setislocalVideoEnabled } = useVideoRender();
  const setisrecording = useRecording((state) => state.setisrecording)
  const chat = useChat((state) => state.chat)

  useEffect(() => {
    const Id: string | undefined = room?.toString();
    if (Id) {
      setRoomid(Id);
    }
  }, [room]);

  useEffect(() => {
    console.log("manager called")
    if (!roomid) return
    const manager = new Manager(roomid, onRemoteStream, onUserConnected, onIsLocalVideoEnabled, onIsRemoteVideoEnabled, onshowPermissionBox);
    console.log(manager);
    const initialize = async () => {
      await manager.create();
      manager.videoStop = () => videoStop;
      setmanager(manager);
    }

    initialize();
    // manager.onCallback = callback; //rqecall of permission box
    return () => {
      manager?.hangup()
    }
  }, [roomid])

  useEffect(() => {
    console.log("fetch media called");
    if (!manager) return
    async function fetchmedia() {
      const MediaStream = await manager?.media.getmedia();
      console.log(MediaStream + "called getmedia from page");
      if (MediaStream && localvid.current && roomid) {
        setlocalmedia(MediaStream);
        localvid.current.srcObject = MediaStream;
      }
    }
    fetchmedia()
  }, [manager])

  useEffect(()=>{
    const rec = () => {
      if (!recorderref.current && typeof room === "string" && localmedia) {
        recorderref.current = Recording(localmedia);
      }
    }
    rec();
  }, [localmedia])

  useEffect(()=>{
    if (remoteStream && remotevid.current) {
      remotevid.current.srcObject = remoteStream
    }
  }, [remoteStream])


  const onshowPermissionBox = () => {
    setshowPermissionBox(true)
  }


  const videoStop = async () => {
    if (!recorderref.current) return console.log("ruk gya")
    const { videoUrl } = await recorderref.current?.stopRecording()
    window.open(videoUrl)
  }

  // starst recording , after clicking yes 
  const triggerRecord = () => {
    recorderref.current?.startrecording()
  }
  const permission = (isAllow: boolean) => {
    if (isAllow) {
      manager?.recording.permissionResponse(true);
      triggerRecord();
      setisrecording(true);
      setshowPermissionBox(false);
    } else {
      manager?.recording.permissionResponse(false);
      setshowPermissionBox(false);
    }
  }

  const onRemoteStream = (media: MediaStream) => { setRemoteStream(media) }
  const onIsRemoteVideoEnabled = (value: boolean) => setisRemoteVideoEnabled(value);
  const onIsLocalVideoEnabled = (value: boolean) => setislocalVideoEnabled(value);
  const onUserConnected = (value: boolean) => setuserconnected(value);
  return (
    <>
      <div className="relative w-screen h-screen bg-white flex flex-col ">
        <UploadingIndicator />
        <Premission permission={permission} showPermissionBox={showPermissionBox} />
        <Header tittle="Podster" size="lg" />
        <div className="w-full h-full bg-[#f7f7f7] flex">
          <div className="flex flex-col h-full flex-1">
            <div className="relative w-full h-full flex justify-center items-center md:gap-8 md:py-5 md:min-w-[75%] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
              <div className="h-[100%] w-[100%] md:w-auto md:aspect-video md:rounded-xl relative overflow-hidden flex items-center justify-center flex-col md:flex-row bg-white">
                <div className="w-[100%] h-[50%] md:w-full md:h-full flex items-center justify-center">
                  {!userconnected ? " User not connected... " : <RenderRemoteVideo remotevid={remotevid} />}
                </div>
                <div className="z-3 md:absolute bottom-2 right-2 md:aspect-video md:h-[30%] md:w-auto h-[50%] w-[100%] md:rounded-xl overflow-hidden bg-white">
                  <RenderLocalvideo remotevid={remotevid} localvid={localvid} />
                </div>
              </div>
            </div>
            <div>{userconnected && <ControlBar data={{ manager, localvid, recorderref }} />}</div>
          </div>
          {chat && userconnected ? <Chatbox manager={manager} /> : null}
        </div>
      </div>
    </>
  );
}