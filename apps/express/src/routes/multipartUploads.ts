import Express, { Router }  from "express";
import {S3Client,PutObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand, GetObjectCommand} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { saveRecording } from "../uploadfunctions/fileupload.js";
import { authenticateToken } from "../middleware.js";
import { prisma } from "../prisma.js";

if (!process.env.S3_SECRET_ID || !process.env.S3_SECRET_KEY) {
  throw new Error("AWS credentials missing");
}

const S3 = new S3Client({
        region:"ap-south-1",
        credentials:{
            accessKeyId:process.env.S3_SECRET_ID,
            secretAccessKey:process.env.S3_SECRET_KEY
        }
    })

export const s3router:Router = Express.Router()

s3router.post("/signedurl",authenticateToken,saveRecording,async(req:any,res)=>{
    try{
        const keyvalue = req.key
        const cmd = new PutObjectCommand({
            Bucket:"podster-01",
            Key:keyvalue
        })
        const signedurl = await getSignedUrl(S3,cmd);
        if(signedurl){
            res.json(signedurl);
        }
    }catch(e){
        res.json(e);
    }
})

s3router.post("/start-multipart",authenticateToken,saveRecording,async(req:any,res)=>{
    let contentType = req.body.contentType;
    const keyvalue = req.key
    const param = {
        Bucket:"podster-01",
        Key:keyvalue,
        ContentType: contentType
    }
    const today = new Date();
    today.setUTCHours(0,0,0,0)
    try{
        const usage : any = await prisma.creds.findUnique({
            where:{ date:today }
        })
        if(!usage) throw new Error("")
        if (usage.count >= 100 ){
            throw new Error("Daily limit reached")
        }
        await prisma.creds.update({
            where:{ date:today },
            data:{
                count:{
                    increment: 1
                }
            }
        })
        const multipart = new CreateMultipartUploadCommand(param)
        const response = await S3.send(multipart);
        const resData = {
            status:true,
            data:{
                UploadId:response.UploadId,
                recID:req.recID
            }
        }
        return res.json(resData); 
    }catch(e){
            return res.status(403).json({
                status:false,
                error:e
            })
        }
    })

s3router.post("/multipart-urls",authenticateToken,async(req:any,res)=>{
    const {recID,UploadId,PartNumber,roomid} = req.body;
    const hostId = req.userId;
    const key = `rooms\\${roomid}\\${hostId}\\${recID}`
    const totalparts = Array.from({length:PartNumber}, (_,i)=>i+1);
    try{
        const urls =await Promise.all(
            totalparts.map(async(PartNumber)=>{
                const param = {
                    Bucket:"podster-01",
                    Key:key,
                    PartNumber:PartNumber,
                    UploadId,
                    Expires:"300*3"
                }
                const cmd = new UploadPartCommand(param)
                return await getSignedUrl(S3,cmd)
            })
        )
            res.json(urls);
    }catch(e){
        res.status(404).json("multipart-url error");
        console.log(e)
}
})

s3router.post("/complete-multipart",async(req:any,res)=>{
    const {Parts,UploadId,recID,roomid} = req.body;
    const hostId = req.userId;
    const key = `rooms\\${roomid}\\${hostId}\\${recID}`
    const param = {
        Bucket:"podster-01",
        Key:key,
        UploadId,
        MultipartUpload:{
            Parts: Parts
        }
    }
    try{
        const cmd = new CompleteMultipartUploadCommand(param)
        const response = await S3.send(cmd)
        console.log(response)
        return res.json({
            status:true,
            msg:'completed upload'
        })
    }catch(e){
        console.log(e);
        res.status(403).json(e);
    }
})

s3router.post("/abort-multipart",async(req:any,res)=>{
    const {UploadId,recID,roomid} = req.body;
    const hostId = req.userId;
    const key = `rooms\\${roomid}\\${hostId}\\${recID}`
    try{
        const cmd = new AbortMultipartUploadCommand({
            Bucket: "podster-01", 
            Key: key, 
            UploadId: UploadId
        })
        const response =await S3.send(cmd);
        console.log(response)
        return res.json(response);
    }catch(e){
         console.log(e);
        return res.status(301).json(e);
    }

})

// s3router.post("/download_url",async(req:any,res)=>{
//     const {recID,roomid} = req.body;
//     const hostId = req.userId;
//     const key = `rooms\\${roomid}\\${hostId}\\${recID}`
//     try{
//         const cmdParam = {
//             Bucket: "podster-01", 
//             Key: key,
//         } 
//         const cmd = new GetObjectCommand(cmdParam);
//         const urlRes = await getSignedUrl(S3,cmd)
//         return res.json({
//             status:true,
//             data:{
//                 url:urlRes
//             }
//         })
//     }catch(e){
//         return res.status(403).json({
//             status:false,
//             error:e,
//         })
//     }
// })

s3router.post("/download_all_from_room",async(req:any,res)=>{
    const {roomid} = req.body;
    if(!roomid){
        res.json({
            status:false,
            message:"no_roomid"
        })
    }
    try{
        const response = await prisma.rooms.findFirst({
            where:{
                id:roomid
            },
            select:{
                recordings:{
                    select:{
                        key:true,
                        name:true
                    }
                }
            }
        })
        const keys = response?.recordings
        const urlPromises = keys?.map(async(key)=>{
            const cmdParam = {
                Bucket: "podster-01", 
                Key: key.key,
                ResponseContentDisposition: `attachment; filename="${key.name}.webm"`,
                ResponseContentType: "application/octet-stream",    
                    } 
            const cmd = new GetObjectCommand(cmdParam);
            const urlRes = await getSignedUrl(S3,cmd)
            console.log(urlRes)
            return urlRes
        })
        if(urlPromises){
            const urls = await Promise.all(urlPromises);
            return res.json({
                status:true,
                message:"download_urls",
                data:urls
            })
        }
        return res.json({
                status:true,
                message:"no downloads",
        })
    }catch(e){
        return res.status(403).json({
            status:true,
            message:"wrong db call",
            error:e
        })
    }
})

