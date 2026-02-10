"use client"
import { useRooom } from "../store"
import { DialogCloseButton } from "./dialog"

interface vairants{
    tittle:string,
    size:"sm"|"lg"
}

const vairants = {
    sm:"text-[26px]",
    lg:"text-4xl"
}

export const Header=({tittle,size}:vairants)=>{
    const roomid = useRooom((state)=>state.roomId)
    const roomname = useRooom((state)=>state.roomname)
return <>
    <div className="flex pl-8 justify-between items-center w-full h-[10vh] bg-white border-b ">
              <div className={`text-black text-4xl ${vairants[size]}`}>{tittle}</div>
              <div className="flex justify-between items-center gap-6 pr-8">
              {tittle=="Podster" &&  <DialogCloseButton url={`${process.env.NEXT_PUBLIC_PAGE_URL}/join/${roomid}/${roomname}`}/>}
              <div className="size-[28px] bg-[#F2F2F2] rounded-full border"></div>
              </div>
            </div>
            </>
} 