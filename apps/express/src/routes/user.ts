import  Express, { Router }  from "express"
import { prisma } from "../prisma.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import process from "process";
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


export const userRouter : Router = Router();
const saltRounds = 10;

userRouter.post("/signup",async(req,res)=>{
    const {password,email} : user= req.body;
    try{
        const hashedpwd = await bcrypt.hash(password,saltRounds)
        const DBres = await prisma.user.create({
            data:{
                password:hashedpwd,
                email
            }
        });
    console.log(DBres);
    return res.json({
        success: true,
        message: "user_created",
    });
    }catch(e){
        return res.status(401).json({
            success: false,
            message: "req_failed",
            error:e 
        });
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password,}= req.body;
    try{
        const DBres =await prisma.user.findFirst({
                    where:{
                        email
                    }
            });
        if(DBres){
                const hashedpwd = DBres.password;
                const result = await bcrypt.compare(password,hashedpwd!)
                if(result){
                    const token = jwt.sign({userid:DBres.id},process.env.JWT_SECRET!)
                    res.cookie("access_token",token,{
                            httpOnly: true,
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                            sameSite: "lax",   
                            secure: false,  
                    })
                    return res.json({
                        success: true,
                        message: "Logedin",
                    })
            }else{
                return res.json({
                    success:false,
                    message:"wrong_password"
                })
            }
        }

    }catch(e){
        console.log(e);
        return res.status(401).json({
        success: false,
        message: "user_nt_found",
        error:e
    });
    }
})
