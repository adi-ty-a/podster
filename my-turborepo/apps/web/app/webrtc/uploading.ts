import axios from "axios";

type UploadedPart = {
  ETag: string
  PartNumber: number
}

type failed={
    url:string,chunk:Blob,partno:number
}

export const UploadingRecording = ():{
    startuploading:(videoFile: File) => Promise<void>
}=>{
    //start the process
    const startmultipart =async (fileName:string)=>{
       const res  = await axios.post("http://localhost:3003/start-multipart",{
        filename:fileName,
        contentType:"video/mp4"
       }) 
       return res.data
    }
    // gets the parsedurls for upload
    const geturls = async(UploadId:string,totalchunks:number,fileName:string)=>{
        const response = await axios.post("http://localhost:3003/multipart-urls",{
            filename:fileName,
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
    const completeupload = async (uploadresponses:UploadedPart[],UploadId:string,fileName:string)=>{
        const response = await axios.post("http://localhost:3003/complete-multipart",{
            fileName:fileName ,
            UploadId: UploadId,
            Parts: uploadresponses,
        })
        console.log(response);
    }
    
    const abortuploading=async(UploadId:string,fileName:string)=>{
        const response = await axios.post("http://localhost:3003/abort-multipart",{
            UploadId,fileName
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
        const UploadId =await startmultipart(fileName)
        const urls = await geturls(UploadId,totalchunks,fileName)
        const chunks:Blob[] = await splited_chunks(videoFile);;
        const etags =await uploadingchunks(chunks,urls)
        if(etags?.status == 'success' && etags.data){
            const orderResponse = checkorder(etags.data,totalchunks);
                if(orderResponse?.status == "success" && orderResponse.res ){
                    await completeupload(orderResponse.res,UploadId,fileName);
                }else if(orderResponse?.status == "failed" && UploadId){
                    await abortuploading(UploadId,fileName);
                    console.log("failed uploading")
                }
        }else if(etags?.status == "rejected" && UploadId){
            await abortuploading(UploadId,fileName);
            console.log("failed uploading")
        }
    }
    return {startuploading}
}