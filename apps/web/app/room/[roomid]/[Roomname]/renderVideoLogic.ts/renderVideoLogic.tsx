"use client"
import { useVideoRender } from "@/app/store";
import PersonIcon from '@mui/icons-material/Person';
import { RefObject } from "react";

type VideoRef = RefObject<HTMLVideoElement | null>;

export const RenderRemoteVideo = ({remotevid}:{remotevid:VideoRef}) => {
    const {isRemoteVideoEnabled} = useVideoRender();
          return (
            <div className=" relative h-full w-full flex items-center justify-center">
                {!isRemoteVideoEnabled && <div className="absolute w-full h-full flex items-center justify-center bg-white">
                    <div className="w-fit h-fit rounded-full bg-[#F2F2F2] p-5  shadow-[0_3px_5px_rgb(0,0,0,0.1)]">
                        <PersonIcon style={{color:"black",fontSize: "200px" }}/>
                    </div>
                </div>}
                <video  className="w-full h-full object-cover" autoPlay ref={remotevid} id="remote" ></video>
            </div>);     
              };

  export const RenderLocalvideo=({remotevid,localvid}:{remotevid:VideoRef,localvid:VideoRef})=>{
       const {islocalVideoEnabled} = useVideoRender();
        return <div className=" relative h-full w-full flex items-center justify-center border border-black/10 ">
                            {!islocalVideoEnabled && <div className="absolute w-full h-full flex items-center justify-center bg-white shadow-[0_3px_15px_rgb(0,0,0,0.8)]">
                                <div className="w-fit h-fit rounded-full bg-[#F2F2F2] p-5  shadow-[0_3px_5px_rgb(0,0,0,0.1)]">
                                    <PersonIcon style={{color:"black",fontSize: "80px" }}/>
                                </div>
                            </div>}
                            <video className="w-full h-full object-cover shadow-[0_3px_5px_rgb(0,0,0,0.1)]" autoPlay ref={localvid} ></video>
                        </div> 
      }