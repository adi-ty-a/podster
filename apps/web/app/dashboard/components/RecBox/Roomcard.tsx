import axios from "axios"
import { ArrowDownToLine, EllipsisVertical, Play, Users } from "lucide-react"
import { RoomsWRecordings } from "../../page"
import {  useRooom } from "../../../store";
import Recording from "../../../recordings/RecordingsBox";
import { useState } from "react";

export const RoomCard=({item}:{item:RoomsWRecordings})=>{
    const {name,date,roomId} = item;
    const roomname = useRooom((state)=>state.roomname);
    const [showRecordingBox,setshowRecordingBox] = useState(true);
    const [urls,seturl] = useState< string[]|null>(null)
    const downloadRecordings=async()=>{
        console.log(roomId)
        const token = localStorage.getItem("token");
        const urlResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/download_all_from_room`,
            {roomid:roomId},
            {
            headers:{
                Authorization:"bearer "+token
            }
        })
        if(urlResponse.data.status){
            setshowRecordingBox(true)
            const urls :string[]= urlResponse.data.data
            seturl(urls);
            return 
        }
    }

    const showRecBox=()=>{
            if(showRecordingBox && urls){
                 return <Recording  name={name!} urls={urls!} setboxstate={setshowRecordingBox} />
            }
    }

    const stringDate = date.toString().split("T")[0]
    const UploadedTime = date.toString().split("T")[1]?.slice(0,5);

    return <div className="relative flex min-w-[1200px] w-full h-[80px] rounded-xl border items-center justify-between">
                    {showRecBox()}
                    <div className=" flex items-center justify-start gap-4 pl-4">
                    <div className="size-10 bg-[#EBEBEB] rounded-2xl flex items-center justify-center">
                        <Play size={20}/>
                    </div>
                    <div className="flex flex-col items-start h-full justify-center mb-1">
                        <div className="text-lg font-semibold leading-tight">{name}</div>
                        <div className="flex gap-2 items-center">
                            <div className="text-[#737373] leading-tight text-[14px]">{stringDate}</div>
                            <div className="h-1 w-1 bg-[#353535]/40 rounded-full"></div>
                            <div className="text-[#737373] leading-tight text-[14px]">{UploadedTime}</div>
                            <div className="h-1 w-1 bg-[#353535]/40 rounded-full"></div>
                            <Users color="#737373" size={12}/>
                            <div className="text-[#737373] leading-tight text-[14px]">2</div>
                        </div>
                    </div>
                    </div>
                    <div className="flex items-center gap-2 pr-2">
                        <div className="bg-[#F0F0F0] rounded-full text-[#262626] text-[12px] font-semibold px-3 py-1 h-fit ">128mb</div>
                        <div className="size-10 cursor-pointer transition ease-in-out delay-100  rounded-lg flex items-center justify-center hover:bg-[#F0F0F0]"
                        onClick={downloadRecordings}
                        >
                            <ArrowDownToLine size={18}/>
                        </div>
                    </div>
            </div>
} 