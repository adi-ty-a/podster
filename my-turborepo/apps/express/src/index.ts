import express, { type Request, type Response } from "express";
import { upload } from "./multer.js";
import { mergeChunks } from "./merge.js";

const app = express();
app.use(express.json())

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

app.listen(3003);