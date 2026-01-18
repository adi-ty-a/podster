import  Express  from "express";

const router = Express.Router();

router.post("/room",(req,res)=>{
    const {Roomname,username} = req.body;
})