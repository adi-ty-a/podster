"use client"

import { useEffect, useState } from "react";
import { Quickinfo } from "./Quickinfo";
import axios from "axios";

type response ={
    status:boolean,
    message:string,
    error?:any,
    data?:any
}

export default function QuickinfoBoxs(){
const [noOFrecordings,setnoOFrecordings] = useState(0)
const [noOFrooms,setnoOFrooms] = useState(0)
 useEffect(()=>{
    getquickinfo()
 },[])


const getquickinfo=async()=>{
    const token = localStorage.getItem("token");
        const response : response= await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room/dashboard`,{
        headers:{
            authorization:"Brearer "+token
        } 
    })
    if(response.data.status){
        const {recordings,rooms} = response.data.data;
        setnoOFrooms(rooms)
        setnoOFrecordings(recordings)
    }
}
    return  <div className="flex w-[90%] pr-12">
                        <Quickinfo data={noOFrooms} tittle="Total_Calls"/>
                        <Quickinfo data={noOFrecordings} tittle="Recordings"/>
            </div>
}