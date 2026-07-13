import express, { Router } from "express";
import passport from "passport";
import {Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./prisma.js"
import 'dotenv/config'
import jwt from "jsonwebtoken";

export const Authrouter :Router  = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.BACKEND_URL}/Oauth/callback`
  },
  async function(accessToken, refreshToken, profile, done) {    
    try{
        console.log(profile.id);
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

Authrouter.get("/google",passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

Authrouter.get("/callback",passport.authenticate("google", { session: false }),(req:any,res)=>{
    const user=  req.user
    const id = user.id
    const token = jwt.sign({userid:id},process.env.JWT_SECRET!)
    res.cookie("access_token",token,{
        httpOnly:true,
        maxAge:7 * 24 * 60 * 60 * 1000,
         secure: false,
          sameSite: "lax",
    })
    return res.redirect(`${process.env.BACKEND_URL}/dashboard`)
}
)