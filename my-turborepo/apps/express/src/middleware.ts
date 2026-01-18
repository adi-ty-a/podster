import type { NextFunction,Response,Request } from "express";
import * as jwt from "jsonwebtoken";

export const authenticateToken =(req:any,res:Response,next:NextFunction)=>{
    const token = req.headers["authenticaiton"];
    if(token && typeof token == "string"){
        jwt.verify(token,process.env.JWT_SECRET!,(err,decoded)=>{
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token'});
            }
            req.userId = decoded;
            next();
        })
    }else{
        res.status(301).json({
            success: false,
            message: "JWT_not_found",
        })
    }
}