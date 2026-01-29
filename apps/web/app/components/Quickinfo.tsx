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
    const size = tittle == "Messages" ? 20:22
    
    return  <div className={`${tittle == "Total_Calls" ? "bg-black text-white":"bg-[#FAFAFA] text-black border border-[#EBEBEB]/80"} rounded-xl min-w-[280px] w-full h-[75px] ml-10 mt-6 flex justify-start items-center gap-6 pl-4`}>
            <Icon color={iconcolor} size={size}/>
            <div className="">
            <p className="text-xl font-bold">{data}</p>
            <p>{tittle == "Total_Calls" ? "Total Calls":Tittle}</p>
            </div>
            </div>
}