import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { User } from "./Usermanage.js";

const app =  express();
const httpServer = createServer(app);
const io = new Server(httpServer, {   cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }});

const user = new User();

io.on("connection", (socket) => {
    socket.on("create",()=>{
      user.createroom(socket);
    })
    socket.on("join",(data)=>{
      user.joinroom(socket,data.roomid);
    })
    user.initHandler(socket);
});

httpServer.listen(3001);