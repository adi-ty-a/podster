import type { NextFunction,Response,Request } from "express";
import jwt from "jsonwebtoken";


type jwt_payload ={
    userid:number
}

export const authenticateToken =(req:any,res:Response,next:NextFunction)=>{
    const authHeader  = req.headers["authorization"];
    if(!authHeader || authHeader == ""){
        res.status(403).json({
            status:false,
            message:"no_token_found"
        })
    }
    const token = authHeader.split(" ")[1];
    if(token && typeof token == "string"){
        try{
            const jwtResponse = jwt.verify(token,process.env.JWT_SECRET!);
            const userid  = jwtResponse as jwt_payload & {userid:number}
            req.userId = userid.userid;
            next();
        }catch(e){
            res.status(301).json({
            success: false,
            message: "JWT_wrong",
        })
        }
    }else{
        res.status(301).json({
            success: false,
            message: "JWT_not_found",
        })
    }
}