"use client"


import HButton from "../components/homebutton"
import { useRouter } from "next/navigation"
export default function JoinPodcastBtn(){
    const router = useRouter()
    return <HButton        
        tittle="Join Podcast"
        vairant="black" 
        className="text-xl md:block hidden "
        onClick={()=>router.push("/login")}
        />
}