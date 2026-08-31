"use client"
import axios from "axios"
import { ArrowDownToLine, EllipsisVertical, Play, Users } from "lucide-react"
import { RoomsWRecordings } from "../../page"
import { useRooom } from "../../../store";
import Recording from "../../../recordings/RecordingsBox";
import { useState } from "react";

export const RoomCard = ({ item }: { item: RoomsWRecordings }) => {
    const { name, date, roomId } = item;
    const roomname = useRooom((state) => state.roomname);
    const [showRecordingBox, setshowRecordingBox] = useState(true);
    const [urls, seturl] = useState<string[] | null>(null)
    const downloadRecordings = async () => {
        console.log(roomId)
        const token = localStorage.getItem("token");
        const urlResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/download_all_from_room`,
            { roomid: roomId },
            {
                headers: {
                    Authorization: "bearer " + token
                },
                withCredentials: true
            })
        if (urlResponse.data.status) {
            setshowRecordingBox(true)
            const urls: string[] = urlResponse.data.data
            seturl(urls);
            return
        }
    }

    const showRecBox = () => {
        if (showRecordingBox && urls) {
            return <Recording key={name} name={name!} urls={urls!} setboxstate={setshowRecordingBox} />
        }
    }

    const stringDate = date.toString().split("T")[0]
    const UploadedTime = date.toString().split("T")[1]?.slice(0, 5);

    return (
        <div 
            className="relative flex w-full min-h-[76px] sm:min-h-[84px] rounded-2xl items-center justify-between bg-white px-3 sm:px-4 py-2.5 gap-2 sm:gap-3 transition-all hover:shadow-md"
            style={{
                boxShadow: "0px 3.92432px 3.92432px rgba(0, 0, 0, 0.06)",
            }}
        >
            {showRecBox()}
            <div className="flex items-center justify-start gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="size-9 sm:size-10 bg-[#3C3C3C] rounded-xl flex items-center justify-center shrink-0">
                    <Play color="white" size={18} />
                </div>
                <div className="flex flex-col items-start justify-center min-w-0 flex-1 overflow-hidden">
                    <div className="text-sm sm:text-base font-semibold leading-tight text-black truncate w-full">{name}</div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[#737373] text-xs leading-tight mt-1">
                        <span className="whitespace-nowrap">{stringDate}</span>
                        {UploadedTime && (
                            <>
                                <span className="h-1 w-1 bg-[#353535]/40 rounded-full shrink-0"></span>
                                <span className="whitespace-nowrap">{UploadedTime}</span>
                            </>
                        )}
                        <span className="h-1 w-1 bg-[#353535]/40 rounded-full shrink-0"></span>
                        <div className="flex items-center gap-1 whitespace-nowrap">
                            <Users color="#737373" size={12} />
                            <span>2</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <button 
                    type="button"
                    className="size-9 sm:size-10 cursor-pointer transition-all duration-150 rounded-xl flex items-center justify-center bg-[#3C3C3C] hover:bg-black active:scale-95 text-white"
                    onClick={downloadRecordings}
                    title="Download Recordings"
                >
                    <ArrowDownToLine color="white" size={16} />
                </button>
            </div>
        </div>
    )
} 