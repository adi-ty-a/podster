"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { LoaderOne } from "@/components/ui/loader";
import { useEffect } from "react";
export default function Join(){
    const router = useRouter()
    const {roomid,Roomname} = useParams()
    const joining =async ()=>{
        try{
            const res =await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room/join`,{
                roomId:roomid
            },{withCredentials:true})
                router.push("/room/"+roomid+"/"+Roomname)
        }catch(e){
                router.push("/dashboard")
        }
    }

    useEffect(()=>{
        joining()
    },[])

    return <div className="flex items-center justify-center h-screen w-screen"><LoaderOne/></div>

}