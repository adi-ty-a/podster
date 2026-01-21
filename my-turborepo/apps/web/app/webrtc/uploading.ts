import axios from "axios";

type UploadedPart = {
  ETag: string
  PartNumber: number
}

type failed={
    url:string,chunk:Blob,partno:number
}

// const roomid = useRooom.getState().roomId; 
const roomid = "0259b668-016b-4e4a-b337-b344bc2315a7"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTc2ODgyMDY1MX0.1Bqr2V8ro7sMjHkJX0tpjxHp8gaJlvLf9ULeAw2v_ds" 

export const UploadingRecording = ():{
    startuploading:(videoFile: File) => Promise<void>
}=>{
    //start the process
    const startmultipart =async (fileName:string)=>{
       const res  = await axios.post("http://localhost:3003/upload/start-multipart",{
            filename:fileName,
            roomid:roomid,
            contentType:"video/mp4"
       },{
        headers:{
            "Authorization":"Bearer " + token
        }
       }
    ) 
    if(res.data.status){
        return res.data.data
    }else{
        console.log(res.data)
        return res.data.status
    }
    }
    // gets the parsedurls for upload
    const geturls = async(UploadId:string,totalchunks:number,recID:string)=>{
        const response = await axios.post("http://localhost:3003/upload/multipart-urls",{
            recID:recID,
            roomid,
            PartNumber:totalchunks,
            UploadId
        },{
        headers:{
            "Authorization":"Bearer " + token
        }
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
    // uploading the chunks using presigned urls
    const upload =async({url,chunk,partno}:{url:string,chunk:Blob,partno:number}):Promise<UploadedPart>=>{
        const res =await axios.put(url,chunk,{
                        headers: {
                            "Content-Type": "video/mp4",
                        },
                    })

        if (res.status !== 200) {
            throw new Error("Upload failed")
        }

        return {
            ETag: res.headers.etag.replaceAll('"', ""),
            PartNumber: partno + 1,
        }
    }
    // starting the process of uploading
    const uploadingchunks =async (chunks:Blob[],urls:string[])=>{
        if (Array.isArray(urls)){
        const uploadPromises:Promise<any>[]= []
          for (let i = 0; i < urls.length; i++){
            const chunk = chunks[i]
            const url = urls[i];
            if(typeof url ===  "string" && chunk){
                uploadPromises.push(
                upload({url,chunk,partno:i}).then((res)=>({
                    value:res,
                    meta:{url,chunk,partno:i},
                    status:"fulfilled"
                }))
                .catch((e)=>({
                    meta:{url,chunk,partno:i},
                    status:"rejected",
                    reason:e
                }))
                )
            }
            }
        const uploadresponses  = await Promise.all(uploadPromises);
        const success :UploadedPart[]=[];
        const failed :failed[] =[];

        uploadresponses.forEach((e)=>{
            if(e.status == "fulfilled"){
                success.push(e.value);
            }else{
                failed.push(e.meta);
            }
        })

        //reuploading

        if(failed.length > 0){
            const reuploadPromises:Promise<any>[]= []
            failed.map((e)=>{
                const {chunk,partno,url} = e;

                reuploadPromises.push(upload({chunk,partno,url})
                .then((e)=>{
                    success.push(e);
                    return e
                }))  
            })
            const reuploadresponse = await Promise.allSettled(reuploadPromises);
            const isfail = reuploadresponse.find((e)=>(e.status == "rejected"))
            if(isfail){
                return {status :"rejected"};
            }
        }
        console.log(success);
        return {status :"success",data:success}; 

        }
    }
    // final completion of the upload
    const completeupload = async (uploadresponses:UploadedPart[],UploadId:string,recID:string)=>{
        const response = await axios.post("http://localhost:3003/upload/complete-multipart",{
            recID:recID ,
            UploadId: UploadId,
            roomid,
            Parts: uploadresponses,
        },{
        headers:{
            "Authorization":"Bearer " + token
        }
       })
        console.log(response);
    }
    
    const abortuploading=async(UploadId:string,recID:string)=>{
        const response = await axios.post("http://localhost:3003/upload/abort-multipart",{
            UploadId,recID,roomid
        },{
        headers:{
            "Authorization":"Bearer " + token
        }
       });
        console.log(response);
    }

    const checkorder=(data:UploadedPart[],totalchunks:number):{status:"failed"|"success",res?:UploadedPart[]}=>{
        if(data.length != totalchunks) return {status:"failed"}
        data.sort((a,b)=>a.PartNumber-b.PartNumber);
        for(let i =0;i<totalchunks;i++){
            const part = data[i]?.PartNumber
            if(part != i+1){
                return {status:"failed"}
            }
        } 
        return {status:"success",res:data}
    }

    // main funtion of the code 
    const startuploading=async(videoFile:File)=>{
        const file = videoFile.name
        const fileName = file.substring(0,file.lastIndexOf("."));
        const chunksize = 10 * 1024 * 1024;
        const totalchunks = Math.ceil(videoFile.size/chunksize);
        const response =await startmultipart(fileName)
        if(!response){
            return console.log("failed")
        }
        const {recID,UploadId} = response;
        const urls = await geturls(UploadId,totalchunks,recID)
        const chunks:Blob[] = await splited_chunks(videoFile);;
        const etags =await uploadingchunks(chunks,urls)
        if(etags?.status == 'success' && etags.data){
            const orderResponse = checkorder(etags.data,totalchunks);
                if(orderResponse?.status == "success" && orderResponse.res ){
                    await completeupload(orderResponse.res,UploadId,recID);
                }else if(orderResponse?.status == "failed" && UploadId){
                    await abortuploading(UploadId,recID);
                    console.log("failed uploading")
                }
        }else if(etags?.status == "rejected" && UploadId){
            await abortuploading(UploadId,recID);
            console.log("failed uploading")
        }
    }
    return {startuploading}
}