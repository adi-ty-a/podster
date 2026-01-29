
import { UploadingRecording } from "./uploading";
import { useRooom } from "../store";

export const Recording = (strean:MediaStream,):{
    startrecording:()=>void ,
    stopRecording:()=>Promise<{videoBlob:Blob,videoUrl:string}>
} =>{
    const room = useRooom.getState()
    const {startuploading} = UploadingRecording()
    let recorder = new MediaRecorder(strean);
    const data = <Blob[]>([]); 
    const startrecording=()=>{
         console.log("starts recording")
        if(recorder){
            recorder.ondataavailable = recordchunks
            recorder.start()
            console.log("started recording")
        }
    }

    const recordchunks = (e:BlobEvent)=>{
        data.push(e.data);
    }
    
    const stopRecording = ()=>{
        console.log("stoped recording")
        return new Promise<{videoBlob:Blob,videoUrl:string}>((resolve)=>{
        recorder.stop()
        recorder.onstop = ()=>{
            const videoBlob = new Blob(data,{type:"video/webm"});
            const videoFile = new File([videoBlob], `${room.roomname}.webm`, { type: "video/webm" });
            if(videoFile){
                startuploading(videoFile);
            }
            const videoUrl =URL.createObjectURL(videoBlob);
            console.log(room.roomname);
            resolve({videoUrl,videoBlob})
            } 
        data.length = 0;
        })
    }



    return {startrecording,stopRecording}
}