"use client"
import { Play } from "lucide-react"
import { Users } from "lucide-react"
import { ArrowDownToLine } from "lucide-react"
import { EllipsisVertical } from "lucide-react"
import { Nav_box } from "../components/nav_box"
import { Header } from "../components/Header"
import { Quickactions } from "../components/Quickactions"
import { Quickinfo } from "../components/Quickinfo"
import { useState } from "react"
export default function Dashboard(){

 const [navselection,setnavselection] = useState<string>("Recordings");
    const togglebutton=()=>{
        if(navselection == "Recordings"){
            setnavselection("Chats")
        }else{
            setnavselection("Recordings")
        }
    }
    
return <>
    <div className="flex">
        <div className="border-r border-gray-300/50 h-screen min-w-[250px] max-w-[420px]">
            <div className=" relative  border-b py-6 flex items-center gap-2 justify-start pl-6">
                <div className="relative flex">
                    <div className="size-[50px] overflow-hidden flex items-center justify-center rounded-2xl">
                        <img
                        src="/logoimg.jpg"
                        alt="Logo"
                        className=" size-[80px]  object-cover object-center"
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
            <div className="flex w-[80%] pr-12">
            <Quickactions variant="create" />
            <Quickactions variant="join" />
            </div>
            <div className="flex w-[90%] pr-12">
            <Quickinfo data={24} tittle="Total_Calls"/>
            <Quickinfo data={12} tittle="Recordings"/>
            <Quickinfo data={156} tittle="Messages"/>
            </div>
        <div className="font-semibold text-lg ml-10 my-10">Recordings</div>
        <div className="flex flex-col gap-2 px-8 ">
            <div className="flex min-w-[1200px] w-full h-[80px] rounded-xl border items-center justify-between">
                <div className=" flex items-center justify-start gap-4 pl-4">

                <div className="size-10 bg-[#EBEBEB] rounded-2xl flex items-center justify-center">
                    <Play size={20}/>
                </div>
                <div className="flex flex-col items-start h-full justify-center mb-1">
                    <div className="text-lg font-semibold leading-tight">Team </div>
                    <div className="flex gap-2 items-center">
                        <div className="text-[#737373] leading-tight text-[14px]">Dec 20, 2025</div>
                        <div className="h-1 w-1 bg-[#353535]/40 rounded-full"></div>
                        <div className="text-[#737373] leading-tight text-[14px]">32:15</div>
                        <div className="h-1 w-1 bg-[#353535]/40 rounded-full"></div>
                        <Users color="#737373" size={12}/>
                        <div className="text-[#737373] leading-tight text-[14px]">2</div>
                    </div>
                </div>
                </div>
                <div className="flex items-center gap-2 pr-2">
                    <div className="bg-[#F0F0F0] rounded-full text-[#262626] text-[12px] font-semibold px-3 py-1 h-fit ">128mb</div>
                    <div className="size-10 cursor-pointer transition ease-in-out delay-100 hover:bg-[#EBEBEB] rounded-lg flex items-center justify-center">
                        <ArrowDownToLine size={18}/>
                    </div>
                    <div className="size-10 cursor-pointer transition ease-in-out delay-100 hover:bg-[#EBEBEB] rounded-lg flex items-center justify-center">
                        <EllipsisVertical size={18}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
}