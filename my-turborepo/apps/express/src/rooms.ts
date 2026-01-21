import  Express, { Router }  from "express";
import { prisma } from "./prisma.js";
export const roomRouter :Router = Express.Router();
import { v4 as uuidv4 } from "uuid"
roomRouter.post("/create",async(req:any,res)=>{
    const Roomname:string = req.body.roomname;
    const userid = req.userId;
    const roomid = uuidv4()
    try{
        if(userid){
            const response = await prisma.rooms.create({
                data:{
                    name:Roomname,
                    hostId:userid,
                    id:roomid
                }
            })
            console.log(response);
            return res.json({
                    success: true,
                    message: "room_created",
                    data:{
                        roomId:response.id
                    }
            })
        }else{
            return res.status(401).json({
                success: false,
                message: "user_id_not_found",
            })
        }
    }catch(e){
        return res.json({    
            success: false,
            message: "db_error",
            error: e
        })
    }
})

roomRouter.post("/join",(req:any,res)=>{
    const roomId :string = req.body.roomId;
    const userid : number= req.userId;
    try{
        if(userid){
            const response = prisma.rooms.update({
                where:{
                    id:roomId
                },
                data:{
                    guestid:userid,
                }
            })
            res.json({
                    success: true,
                    message: "room_joined",
                    data: {
                        roomid:response
                    }
            })
        }else{
            return res.status(401).json({
                success: false,
                message: "user_id_not_found",
            })
        }
    }catch(e){
        return res.json({    
            success: false,
            message: "db_error",
            error: e
        })
    }
})

roomRouter.get("/recordings")