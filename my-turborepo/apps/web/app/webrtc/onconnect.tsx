       import { rtc } from "./logic";
        import { io ,Socket} from "socket.io-client";
        import { useEffect, useMemo, useRef, useState } from "react"

        export const useWebrtc=(roomid:string)=>{
            const [Localstream,setLocalStream]=useState<MediaStream>()
            const LocalstreamRef = useRef<MediaStream | null>(null);
            let server :Socket  = useMemo(() => io("http://localhost:3001"), []); 
            const newrtc = useRef< rtc |null>(null)
                useEffect(()=>{
                        const init = async()=>{
                        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                        setLocalStream(stream);
                        LocalstreamRef.current = stream
                    }
                    init()
                },[])

                function Connect(tracks:MediaStream,action:"join"|"create",roomid?:string,){
                    newrtc.current = new rtc(tracks,server)
                    const currtc = newrtc.current
                    if(action == "create"  && roomid != "none"){
                        const res = server.emit("create")
                      }else if(action == "join" && roomid != "none"){
                        const res = server.emit("join",{roomid})
                    }
                    if(roomid  && roomid != "none" && currtc){
                    currtc.roomid = roomid
                    }
                    if(!server.hasListeners("roomid") && currtc){
                        server.on("room-closed",()=>{
                          currtc.closeVideoCall()
                          server.close()
                          roomid = "none"})
                        server.on("roomid",(roomid)=>currtc.roomid = roomid)
                        server.on("send-offer",(data)=>  currtc.createPeerConnection(true,data.roomid))
                        server.on("Offer",(msg) =>  currtc.handleVideoOfferMsg(msg))
                        server.on("answer",(msg) => currtc.handleVideoAnswerMsg(msg))
                        server.on("new-ice-candidate",(msg) => currtc.handleNewICECandidateMsg(msg))
                    }
                } 

                const createroom=(room:string)=>{
                  if(Localstream){
                    Connect(Localstream,"create")
                  }
                }
                
                const joinroom=()=>{
                  if(LocalstreamRef.current){

                  Connect(LocalstreamRef.current,"join",roomid)
                  }
                      
                }
            
                const togglevideo = (newLocalstream:MediaStream) => {
                  if(newLocalstream){
                    newLocalstream?.getVideoTracks().forEach((e)=>{
                      e.enabled = !e.enabled
                    })
                  }
                };
            
                 const toggleaduio = (newLocalstream:MediaStream) => {
                  if(newLocalstream){
                    newLocalstream?.getAudioTracks().forEach((e)=>{
                      e.enabled = !e.enabled
                    })
                  }
                };

                const hangup =()=>{
                    if(newrtc.current){
                      newrtc.current.hangupcall()
                    }
                    server.close()
                    roomid = "none"
                }


            return {createroom,joinroom,togglevideo,toggleaduio,Localstream,hangup}
        }