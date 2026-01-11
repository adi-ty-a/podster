"use client"
import { useState } from "react"
import { UploadingRecording } from "../webrtc/uploading"


export default function Testuploading(){
    const [video,setvideo] = useState<any>(null)
    const {startuploading} = UploadingRecording();
    const handleFileChange=(file:React.ChangeEvent<HTMLInputElement>)=>{
         const e = file.target.files?.[0];
         setvideo(e);
    }

    return <div className="bg-gray-700 h-screen w-screen">
        <div className="text-2xl text-white">Testing Uploading of file...</div>
        <input type="file" name="video"
        onChange={handleFileChange}/>
        <button onClick={()=>{
            startuploading(video);
        }}>upload</button>
    </div>
} 