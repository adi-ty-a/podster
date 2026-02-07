import  Express, { Router }  from "express";
import { prisma } from "../prisma.js";
export const roomRouter :Router = Express.Router();
import { v4 as uuidv4 } from "uuid";

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
        console.log(e);
        return res.json({    
            success: false,
            message: "db_error",
            error: e
        })
    }
})

roomRouter.post("/join",async(req:any,res)=>{
    const roomId :string = req.body.roomId;
    const userid : number= req.userId;
    try{
        if(userid){
            const response = await prisma.rooms.update({
                where:{
                    id:roomId
                },
                data:{
                    guestid:userid,
                }
            })
            console.log(response);
            return res.json({
                    success: true,
                    message: "room_joined",
                    data:response
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


roomRouter.get("/rooms_w_recordings",async(req:any,res)=>{
    const userid = req.userId
    const {roomId,date} = req.query;
    const hasCursor = roomId && date;
    try{
        const DBres = await prisma.rooms.findMany({
            take: 4,
            where:{
                AND:[{
                    OR:[
                        {
                            guestid:userid
                        },
                        {
                            hostId:userid
                        }],
                    },
                    {
                        recordings:{
                            some:{}
                        }
                    }
                ]   
            },
            ...(hasCursor && {
                skip:1,
                cursor: {
                id: roomId,
                date:new Date(date)
            }}),
            orderBy: [
            { date: "desc" },
            { id: "desc" },
        ],
        })
        const data = DBres.map(element => {
            const {name,date,id} = element;
            return {
                name,date,roomId:id
            }
        })    
        return res.json({
            status:true,
            message:"rooms_with_recordings",
            data
        });
    }catch(e){
            res.status(403).json({
            status:false,
            message:"db_error",
            error:e
            })
        }
})

roomRouter.post("/room_recordings",async(req,res)=>{
    const {roomId} = req.body;
    try{
    const DBres = await prisma.rooms.findUnique ({
        where:{
            id:roomId
        },
        select:{
            recordings:{
                select:{
                    id:true,
                    name:true,
                }
            }
        }
    })
    return res.json({
        status:true,
        message:"recordings",
        data:DBres?.recordings});
    }catch(e){
        return res.status(403).json({
            status:false,
            message:"db_error",
            error:e
        })
    }
})

roomRouter.get("/dashboard",async(req:any,res)=>{
    const userId = req.userId;
    console.log(userId)
    try{
        
        const DBres = await prisma.rooms.findMany({
            select:{
                id:true,
                _count:{
                    select:{
                        recordings:true,
                    }
                }
            },
            where:{
                OR:[{hostId:userId},{guestid:userId}]
            }
        })     
        let RecordingsNo=0;
        DBres.map((item)=>RecordingsNo+=item._count.recordings)
        const noOfRooms= DBres.length 
        return res.json({
            status:true,
            message:"collected_rooms_&_recordings",
            data:{
                rooms:noOfRooms,
                recordings:RecordingsNo
            }
        })

    }catch(e){
        return res.status(403).json({
            status:true,
            message:"db_error",
            error:e
        })
    }
})