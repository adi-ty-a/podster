import axios from "axios";

export const Recording = (strean:MediaStream,room:string):{
    startrecording:()=>void ,
    stopRecording:()=>Promise<{videoBlob:Blob,videoUrl:string}>
} =>{
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
            const videoFile = new File([videoBlob], `${room}.webm`, { type: "video/webm" });
            // stop(videoFile);
            const videoUrl =URL.createObjectURL(videoBlob);
            console.log(" recording pushed")
            resolve({videoUrl,videoBlob})
            // splitchunks(videoFile);
            } 
        data.length = 0;
        })
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
    //start the process
    const startmultipart =async ()=>{
       const res  = await axios.post("http://localhost:3003/start-multipart",{
        filename:"first",
        contentType:"video/webm"
       }) 
       return res.data
    }
    // gets the parsedurls for upload
    const geturls = async(UploadId:String,totalchunks:number)=>{
        const response = await axios.post("http://localhost:3003/multipart-urls",{
            filename:"first",
            PartNumber:totalchunks,
            UploadId
        })
        return response.data
    } 
    //creates equal chunks of video
    const splited_chunks = async(videoFile:File)=>{
        const chunksize = 10 * 1024 * 1024;
        const totalchunks = Math.ceil(videoFile.size/chunksize);
        const chunks:Blob[] =  Array.from({length:totalchunks},(_,i)=>{
           return videoFile.slice(i*chunksize,(i+1)*chunksize);
        })
        return chunks
    }

    const uploadingchunks =async (chunks:Blob[],urls:String[])=>{
        if (Array.isArray(urls)){
        const uploadPromises:Promise<any>[]= []
        const serialchunks = chunks.reverse()
          for (let i = 0; i < urls.length; i++){
            const chunk = serialchunks.pop();
            const url = urls[i];
                if(typeof url ===  "string"){
                    uploadPromises.push(
                     axios.put(url,chunk,{
                        headers: {
                            "Content-Type": "video/webm",
                        },
                    }))
                }
            }
        const uploadresponses : any = await Promise.all(uploadPromises)
        console.log(uploadresponses);
        return uploadresponses.map((e:any)=>e.headers.etag); 
        }
    }

    const completeupload = async (etags:String[],uploadId:String)=>{
        const parts : any = []
        etags.forEach((x,i)=>{
            parts.push({
                etag:x,
                PartNumber:i
            })
        })

        const response = await axios.post("http://localhost:3003/complete-multipart",{
            fileName: "first",
            uploadId: uploadId,
            parts: parts,
        })
        console.log(response);
    }

    const stop=async(videoFile:File)=>{
        const chunksize = 10 * 1024 * 1024;
        const totalchunks = Math.ceil(videoFile.size/chunksize);
        const UploadId =await startmultipart()
        const urls = await geturls(UploadId,totalchunks)
        const chunks:Blob[] = await splited_chunks(videoFile);
        const etags =await uploadingchunks(chunks,urls)
        completeupload(etags,UploadId);
    }

    return {startrecording,stopRecording}
}