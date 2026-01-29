"use client"
import { useState } from "react"
import { UploadingRecording } from "../webrtc/uploading"
import { UploadingIndicator } from "../components/uploadingIndicator";

export default function Testuploading(){
    const [video,setvideo] = useState<any>(null)
    const {startuploading} = UploadingRecording();
    const handleFileChange=(file:React.ChangeEvent<HTMLInputElement>)=>{
         const e = file.target.files?.[0];
         setvideo(e);
    }
    return <div className="relative w-screen h-screen flex justify-center py-6 bg-gray-700">
                <UploadingIndicator/>
                <div className=" h-screen w-screen">
                    <div className="text-2xl text-white">Testing Uploading of file...</div>
                    <input className="rounded-md bg-white text-black" type="file" name="video"onChange={handleFileChange}/>
                    <button className="rounded-md bg-white text-black" onClick={()=>{startuploading(video);}}>upload</button>
                </div>
            </div>  
    
} 