import express from "express";
import 'dotenv/config'
import cors  from "cors";
import {userRouter} from "./routes/user.js";
import { roomRouter } from "./routes/rooms.js";
import { authenticateToken } from "./middleware.js";
import { s3router } from "./routes/multipartUploads.js";
import {Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { prisma } from "./prisma.js"
import jwt  from "jsonwebtoken";
import process from "process";
import cookieParser from "cookie-parser";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:3003/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
        const response = await prisma.user.upsert({
            where: {
                googleId: profile.id
            },
            update: {},
            create: {
                googleId: profile.id,
                email:  profile.emails?.[0]?.value ?? null,
                name: profile.displayName
            }
        })
        return done(null,response)
    }catch(e){
        return done(e)
    }
  }
));

const app = express();
app.use(express.json())
app.use(cors())
app.use(passport.initialize());
app.use(cookieParser());

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

app.get("/google/callback",passport.authenticate("google", { session: false }),(req:any,res)=>{
        const user=  req.user
        const id = user.id
        const token = jwt.sign({userid:id},process.env.JWT_SECRET!)
        res.cookie("access_token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7 * 24 * 60 * 60 * 1000,
        })
        return res.redirect(`${process.env.FRONTEND_URL}/dashboard`)
    }
)

app.use("/user",userRouter);
app.use("/room",authenticateToken,roomRouter);
app.use("/upload",authenticateToken,s3router);
console.log("server started");
app.listen(3003);

