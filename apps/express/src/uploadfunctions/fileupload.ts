import Express, { Router, type NextFunction, type Response }  from "express";
import { prisma } from "../prisma.js";
import { v4 as uuidv4 } from "uuid"

type recordingReq = {
    filename:string,
    roomid:string
}

export const saveRecording = async(req:any,res:Response,next:NextFunction)=>{
    const {filename,roomid}:recordingReq = req.body;
    const hostId = req.userId;
        try{
            const recID = uuidv4()
            const key = `rooms\\${roomid}\\${hostId}\\${recID}`
            console.log(req.body);
            console.log(recID);
            console.log(hostId);
            console.log(key);
            await prisma.recordings.create({
                data:{
                    id:recID,
                    name:filename,
                    roomId:roomid,
                    createdById:hostId,
                    key:key,
                    status:"PENDING"
                }
            })
            req.key = key;
            req.recID = recID
            next();
        }catch(e){
            return res.json({
                        success: false,
                        message: "db_upload_error",
                        error:e
            })
        }
    }