import axios from "axios";

type UploadedPart = {
  ETag: string
  PartNumber: number
}

export const UploadingRecording = ():{
    startuploading:(videoFile: File) => Promise<void>
} =>{
    //start the process
    const startmultipart =async ()=>{
       const res  = await axios.post("http://localhost:3003/start-multipart",{
        filename:"first",
        contentType:"video/mp4"
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
    const uploadingchunks =async (chunks:Blob[],urls:String[])=>{
        if (Array.isArray(urls)){
        const uploadPromises:Promise<any>[]= []
          for (let i = 0; i < urls.length; i++){
            const chunk = chunks[i]
            const url = urls[i];
                if(typeof url ===  "string" && chunk){
                    uploadPromises.push(
                    upload({url,chunk,partno:i})
                    )
                }
            }
        const uploadresponses : UploadedPart[] = (await Promise.all(uploadPromises)).sort((a, b) => a.PartNumber - b.PartNumber);
        console.log(uploadresponses);
        return uploadresponses; 
        }
    }
    // final completion of the upload
    const completeupload = async (uploadresponses:UploadedPart[],UploadId:String)=>{
        const response = await axios.post("http://localhost:3003/complete-multipart",{
            fileName: "first",
            UploadId: UploadId,
            Parts: uploadresponses,
        })
        console.log(response);
    }
    // main funtion of the code 
    const startuploading=async(videoFile:File)=>{
        const chunksize = 10 * 1024 * 1024;
        const totalchunks = Math.ceil(videoFile.size/chunksize);
        const UploadId =await startmultipart()
        const urls = await geturls(UploadId,totalchunks)
        const chunks:Blob[] = await splited_chunks(videoFile);;
        const etags =await uploadingchunks(chunks,urls)
        if(etags){
            completeupload(etags,UploadId);
        }
    }
    return {startuploading}
}