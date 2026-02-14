"use client"
import { useState } from "react"
import { useRooom } from "../store"
import { DialogCloseButton } from "./dialog"
import { LogOut } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"
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
    const [profileToggle,setprofileToggle] = useState(false);
    const router = useRouter()
    const ToggleProfile=()=>{
        setprofileToggle((e)=>!e)
        return
    }
    const Logout=async()=>{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/logout`,{},{withCredentials:true})
        router.push("/home")
        return 
    }

return <>
    <div className="flex pl-8 justify-between items-center w-full h-[10vh] bg-white border-b ">
              <div className={`text-black text-4xl ${vairants[size]}`}>{tittle}</div>
                <div className="flex justify-between items-center gap-6 pr-8">
                {tittle=="Podster" ?  <DialogCloseButton url={`${process.env.NEXT_PUBLIC_PAGE_URL}/join/${roomid}/${roomname}`}/> : <div className="relative size-[28px] bg-[#F2F2F2] rounded-full border" onClick={ToggleProfile}>
                    {profileToggle && <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 bg-white rounded-md border text-black text-sm px-4 py-2 flex items-center justify-center gap-2 transition duration-300 hover:bg-[#F2F2F2] cursor-pointer " 
                    onClick={()=>{
                        Logout()
                        ToggleProfile()} }
                    >Logout <LogOut size={12}/></div>}
                </div>}
              </div>
            </div>
            </>
} 