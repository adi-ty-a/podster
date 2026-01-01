"use client"
import { LucideIcon, Play } from "lucide-react"
import { MessageSquare } from "lucide-react"
import { Info } from "lucide-react"

const variants:Record<string, LucideIcon> = {
    Recordings:Play,
    Chats:MessageSquare,
    help:Info
}

export const Nav_box=({tittle,navselection,togglebutton}:{tittle:string,navselection?:string,togglebutton?:()=>void})=>{
    const Icon = variants[tittle]

    return <div
    onClick={togglebutton}
    className={`${navselection == tittle ? "transtion bg-black text-white" :" bg-[EBEBEB] text-[#757575] hover:bg-[#EBEBEB] hover:text-black"}
    cursor-pointer  w-[200px] py-2 rounded-xl px-4 ml-6 text-lg mt-4 flex gap-2 font-semibold transition ease-in-out delay-100 items-center justify-start ` }>
                    {Icon && <Icon size={15}/>}
                    <div className="text-[16px]">{tittle}</div>
                </div>
} 