import axios from "axios";

export const Recording = (strean:MediaStream,room:string):{
    startrecording:()=>void ,
    stopRecording:()=>Promise<{videoBlob:Blob,videoUrl:string}>
} =>{
    let recorder = new MediaRecorder(strean);
    const data = <Blob[]>([]); 
    const startrecording=()=>{
        console.log("started recording")
        if(recorder){
            recorder.ondataavailable = recordchunks
            recorder.start()
            }
        }

    const stopRecording = ()=>{
        console.log("stoped recording")
        return new Promise<{videoBlob:Blob,videoUrl:string}>((resolve)=>{
        recorder.stop()
        recorder.onstop = ()=>{
            const videoBlob = new Blob(data,{type:"video/webm"});
            const videoFile = new File([videoBlob], `${room}.webm`, { type: "video/webm" });
            const videoUrl =URL.createObjectURL(videoBlob);
            resolve({videoUrl,videoBlob})
            splitchunks(videoFile);
            } 
        data.length = 0;
        })

    }

    const recordchunks = (e:BlobEvent)=>{
        data.push(e.data);
    }

    const splitchunks = async(videoFile:File)=>{
        const chunksize = 10 * 1024 * 1024;
        const totalchunks = Math.ceil(videoFile.size/chunksize);
        for(let start=0;start<videoFile.size;start+=chunksize){
            const chunk = videoFile.slice(start,start+=chunksize);
            const formData = new FormData();
            formData.append("video", new File([chunk], videoFile.name, { type: "video/webm" }));
            formData.append("chunk",Math.floor(start/chunksize).toString());
            formData.append("totalChunks",totalchunks.toString());
            formData.append("filename","first one");
            formData.append('originalname', videoFile.name);
            const response = await axios.post("http://localhost:3003/upload",formData,{
                headers:{
                    "Content-type":"multipart/form-data"
                }
            })
            console.log(response);
        }
    }

    return {startrecording,stopRecording}
}