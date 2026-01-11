import express, { type Request, type Response } from "express";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { upload } from "./multer.js";
import { mergeChunks } from "./merge.js";
import {S3Client,PutObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand} from "@aws-sdk/client-s3"
import 'dotenv/config'
import cors  from "cors";

const app = express();
app.use(express.json())
app.use(cors())


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

app.post("/upload",upload.single("video"),async(req:Request,res:Response)=>{
    if(!req.file){
        return res.status(400).json({error:"no video file uploaded"})
    }
    try{
        console.log(req.body);
        const chunkno = Number(req.body.chunk);
        const totalchunks = Number(req.body.totalChunks);
        const filename = req.body.originalname.replace(/\s+/g,"")
            console.log("after chunk")
        if (chunkno === totalchunks) {
            console.log("inside chunk")
            await mergeChunks(filename, totalchunks);
        }
    }catch (error) {
    console.error('Error during file upload:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while uploading the video.' });
  }
})

app.post("/signedurl",async(req,res)=>{
    try{
        const keyvalue = req.body.key;
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

app.post("/start-multipart",async(req,res)=>{
    
    let filename = req.body.filename;
    let contentType = req.body.contentType;
    const param = {
        Bucket:"podster-01",
        Key:filename,
        ContentType: contentType
    }
    try{
        const multipart = new CreateMultipartUploadCommand(param)
        const response = await S3.send(multipart);
        res.json(response.UploadId); 
    }catch(e){
            console.log(e);
        }
    })

app.post("/multipart-urls",async(req,res)=>{
    const {filename,UploadId,PartNumber} = req.body;
    const totalparts = Array.from({length:PartNumber}, (_,i)=>i+1);
    try{
        const urls =await Promise.all(
            totalparts.map(async(PartNumber)=>{
                const param = {
                    Bucket:"podster-01",
                    Key:filename,
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

app.post("/complete-multipart",async(req,res)=>{
    const {Parts,UploadId,fileName} = req.body;
    const param = {
        Bucket:"podster-01",
        Key:fileName,
        UploadId,
        MultipartUpload:{
            Parts: Parts
        }
    }
    try{
        const cmd = new CompleteMultipartUploadCommand(param)
        const response =await S3.send(cmd)
        res.json(response)
    }catch(e){
        console.log(e);
        res.json(e);
    }
})

app.post("/abort-multipart",async(req,res)=>{
    const {UploadId,fileName} = req.body;
    try{
        const cmd = new AbortMultipartUploadCommand({
            Bucket: "podster-01", 
            Key: fileName, 
            UploadId: UploadId
        })
        const response =await S3.send(cmd);
        console.log(response)
        res.json(response);
    }catch(e){
         console.log(e);
        res.status(301).json(e);
    }

})

app.listen(3003);