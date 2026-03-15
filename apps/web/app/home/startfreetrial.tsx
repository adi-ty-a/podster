import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function StartFreeTrail(){
    const router = useRouter()
    return <button className="text-black bg-white rounded-2xl px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold flex items-center gap-2 transition ease-in-out duration-500 hover:scale-110 hover:bg-red-400 cursor-pointer" onClick={()=>router.push("/login")}>Start free trial<ArrowRight className="w-4 h-4 md:w-5 md:h-5"/></button>

}