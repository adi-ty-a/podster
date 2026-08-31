import { Video } from "lucide-react"
import { Play } from "lucide-react"
import { MessageSquare } from "lucide-react"
import { useState } from "react"

    const iconsmap= {
        Total_Calls:Video,
        Recordings:Play,
        Messages:MessageSquare
    }

export const Quickinfo = ({ data, tittle }: { data: number, tittle: keyof typeof iconsmap }) => {
    const [Tittle, setTittle] = useState(tittle)
    
    return (
        <div className="bg-white rounded-4xl p-4 sm:p-5 md:p-6 flex flex-col justify-between items-start w-full min-h-[110px] sm:min-h-[130px] md:min-h-[140px] shadow-sm border border-black/5 transition-all hover:shadow-md">
            <p className="text-xs sm:text-lg text-[#8C8C8C] font-bold uppercase tracking-wider ">
                {tittle === "Total_Calls" ? "Total Calls" : Tittle}
            </p>
            <p className="text-3xl ml-[25px] sm:text-4xl md:text-6xl font-bold text-[#434343] tracking-tight mt-1 ">
                {data}
            </p>
        </div>
    )
}