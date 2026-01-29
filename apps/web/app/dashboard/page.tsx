"use client"
import { Nav_box } from "../components/nav_box"
import { Header } from "../components/Header"
import { Quickactions } from "../components/Quickactions"
import { Quickinfo } from "../components/Quickinfo"
import { useEffect, useState } from "react"
import { RoomNameDialog } from "../components/RoomNameDialog"
import { RoomCard } from "../components/Roomcard"
import axios from "axios"
import { UploadingIndicator } from "../components/uploadingIndicator"
export default function Dashboard(){

type response ={
    status:boolean,
    message:string,
    error?:any,
    data?:any
}

type RoomsWRecordings = {
    name:string,
    date:Date,
    roomId:string
}

const [navselection,setnavselection] = useState<string>("Recordings/");
const [roomsWithRecordings,setroomsWithRecordings] = useState<RoomsWRecordings[]|null>(null)

 useEffect(()=>{
    getRoomsWithRecordings()

 },[])

const togglebutton=()=>{
    if(navselection == "Recordings"){
        setnavselection("Chats")
    }else{
        setnavselection("Recordings")
    }
}

const getRoomsWithRecordings=async()=>{
    const token = localStorage.getItem("token");
    const response : response= await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room/rooms_w_recordings`,{
        headers:{
            Authorization:"Brearer "+token
        }
    })
    console.log(response)
    if(response.data.status == true){
        setroomsWithRecordings(response.data.data)
        
    }
}

return <>
        <div className="relative flex">
            <UploadingIndicator/>
            <div className="border-r border-gray-300/50 h-screen min-w-[250px] max-w-[420px]">
                <div className=" relative  border-b py-6 flex items-center gap-2 justify-start pl-6">
                    <div className="relative flex">
                        <div className="size-[50px] overflow-hidden flex items-center justify-center rounded-2xl">
                            <img
                            src="/logoimg.jpg"
                            alt="Logo"
                            className="size-[80px]  object-cover object-center"
                            />
                        </div>
                            <div className=" absolute left-10 size-[15px] rounded-full bg-black animate-pulse"></div>
                        </div>
                        <div className="text-2xl font-bold  ">Podster</div>
                </div>
                <div>
                    <Nav_box tittle="Recordings" navselection={navselection}  togglebutton={togglebutton}/>
                    <Nav_box tittle="Chats" navselection={navselection}togglebutton={togglebutton}/>
                </div>
                <div className="h-px mt-12 mx-6 bg-[#E5E7EB]"></div>
                <Nav_box tittle="help"  />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <Header tittle="Dashboard" size="sm"/>
                <div className="font-semibold text-lg ml-10 mt-6">Quick Actions</div>
                <div className="flex w-[80%] pr-12 gap-12">
                    <RoomNameDialog/>
                    <Quickactions variant="join" />
                </div>
                <div className="flex w-[90%] pr-12">
                    <Quickinfo data={24} tittle="Total_Calls"/>
                    <Quickinfo data={12} tittle="Recordings"/>
                    <Quickinfo data={156} tittle="Messages"/>
                </div>
            <div className="font-semibold text-lg ml-10 my-10">Recordings</div>
            <div className="flex flex-col gap-2 px-8 ">
                {roomsWithRecordings?.map((item:RoomsWRecordings)=>{
                    return <RoomCard name={item.name} date={item.date}/>
                }) }
            </div>
            </div>
        </div>
    </>
}