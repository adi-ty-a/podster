import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { User } from "./Usermanage.js";
import { RoomManager } from "./room.js";

const app =  express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const roomhandler =  new RoomManager();

io.on("connection", (socket) => {

  const user = new User();
    user.adduser("kycuhbhi",socket);
    socket.on("create",()=>{
      user.createroom(roomhandler,socket);
    })

    socket.on("join",(roomid:string)=>{
      user.joinroom(roomhandler,socket,roomid);
    })
});

httpServer.listen(3000);