import  Express  from "express";
import { prisma } from "./prisma";
import bcrypt from "bcrypt"
type user ={
    username:string,
    password:string,
    name:string,
    email:string
}

type res = {
    success: boolean,
    message: string,
    data?: any,
    error?: string
}

const router = Express.Router();
const saltRounds = 10;

router.post("/signup",async(req,res)=>{
    const {username,password,name,email} : user= req.body;
    try{
        const hashedpwd = await bcrypt.hash(password,saltRounds)
        const DBres = await prisma.user.create({
            data:{
                username,
                password:hashedpwd,
                name,
                email
            }
        });
    console.log(DBres);
    res.json({
        success: true,
        message: "user_created",
    });
    }catch(e){
        res.status(401).json({
            success: false,
            message: "req_failed",
            error:e 
        });
    }
})

router.post("/login",async(req,res)=>{
    const {email,password,}= req.body;
    try{
    const DBres =await prisma.user.findFirst({
                where:{
                    email
                }
        });
    console.log(DBres);
    if(DBres){
        const hashedpwd = DBres.password;
        const result = await bcrypt.compare(password,hashedpwd)
        if(result){
            res.json({
                success: true,
                message: "Logedin",
                data:{
                    userid: DBres.id,
                    username:DBres.username
                }
            })
        }else{
            res.json({
                success:false,
                message:"wrong_password"
            })
        }
    }
    }catch(e){
        res.status(401).json({
        success: false,
        message: "user_nt_found",
        error:e
    });
    }
})