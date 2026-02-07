"use client"
import { useEffect, useState } from "react"
import { RoomCard } from "./Roomcard"
import { RoomsWRecordings } from "../../page"
import axios from "axios"
type response ={
    status:boolean,
    message:string,
    error?:any,
    data?:any
}

export default function RecordingsBox(){

const [roomsWithRecordings,setroomsWithRecordings] = useState<RoomsWRecordings[]|null>(null)

 useEffect(()=>{
    getRoomsWithRecordings()
 },[])

 const getRoomsWithRecordings=async()=>{
    const response : response= await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room/rooms_w_recordings`)
    if(response.data.status == true){
        setroomsWithRecordings(response.data.data)
        
    }
}

    return  <div className="flex flex-col gap-2 px-8 ">
                    {roomsWithRecordings?.map((item:RoomsWRecordings)=>{
                        return <RoomCard item={item}/>
                    }) }
            </div>
}