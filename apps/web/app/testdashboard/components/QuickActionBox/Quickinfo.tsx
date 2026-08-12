import { Video } from "lucide-react"
import { Play } from "lucide-react"
import { MessageSquare } from "lucide-react"
import { useState } from "react"

    const iconsmap= {
        Total_Calls:Video,
        Recordings:Play,
        Messages:MessageSquare
    }

export const Quickinfo=({data,tittle}:{data:number,tittle: keyof typeof iconsmap})=>{
    const Icon = iconsmap[tittle]
    const [Tittle,setTittle] = useState(tittle)
    const iconcolor = tittle == "Total_Calls" ? "white":"black" 
    const size = tittle == "Messages" ? 24:35
    
    return  <div className={`${tittle == "Total_Calls" ? "bg-black text-white":"bg-[#FAFAFA] text-black border border-[#EBEBEB]/80"} rounded-[6px]  w-fit h-[75px]  mt-6 flex justify-start items-center gap-6 px-4`}>
            <Icon color={iconcolor} size={size}/>
            <div className="">
            <p className="m-0 p-0 leading-none">{tittle == "Total_Calls" ? "Total Calls":Tittle}</p> 
            <p className="text-[32px] font-bold m-0 p-0 leading-none">{data}</p>
            </div>
            </div>
}