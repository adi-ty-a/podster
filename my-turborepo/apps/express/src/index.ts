import express from "express";
import 'dotenv/config'
import cors  from "cors";
import {userRouter} from "./user.js";
import { roomRouter } from "./rooms.js";
import { authenticateToken } from "./middleware.js";
import { s3router } from "./multipartUploads.js";

const app = express();
app.use(express.json())
app.use(cors())
app.use("/user",userRouter);
app.use("/room",authenticateToken,roomRouter);
app.use("/upload",authenticateToken,s3router);
console.log("server started");
app.listen(3003);