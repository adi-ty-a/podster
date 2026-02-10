import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { User } from "./Usermanage.js";
import jwt from "jsonwebtoken"
import { error } from "console";
import cookie from "cookie"
import 'dotenv/config'

const app =  express();
const httpServer = createServer(app);
const io = new Server(httpServer, {   cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }});
  const user = new User();
  io.use((Socket,next)=>{
    if(isvalid(Socket)){
      next()
    }else{
      next(new Error("not authorized"))
    } 
  })
  const isvalid=(Socket:Socket)=>{
    const TokenCookie :any= Socket.handshake.headers.cookie;
    if(!TokenCookie) return false
    const token :any= cookie.parse(TokenCookie)
    try{
      jwt.verify(token.access_token,process.env.JWT_SECRET!)
      return true
    }catch(e){
      return false
    }
  }

io.on("connection", (socket) => {
    // socket.on("create",()=>{
    //   user.createroom(socket);
    // })
    socket.on("join",(data)=>{
      user.joinroom(socket,data.roomid);
    })
    user.initHandler(socket);
});

httpServer.listen(3001);
