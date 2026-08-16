import express from "express";
import 'dotenv/config'
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { roomRouter } from "./routes/rooms.js";
import { Authrouter } from "./auth.js";
import { authenticateToken } from "./middleware.js";
import { s3router } from "./routes/multipartUploads.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { prisma } from "./prisma.js";

const app = express();

app.use(express.json())

app.use(cors({
    origin: "*",
    credentials: true
}))

app.get("/status",(req,res)=>{
    res.json("backend-working");
})

app.use(passport.initialize());

app.use(cookieParser());

app.get("/check", async (req, res) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    try {
        let usage = await prisma.creds.findUnique({
            where: { date: today }
        });
        if (!usage) {
            usage = await prisma.creds.create({
                data: { date: today, count: 0 }
            });
        }
        if (usage.count >= 100) {
            throw new Error("Daily limit reached");
        }
        res.json(true);
    } catch (e) {
        res.status(403).json(e);
    }
});

app.use("/user", userRouter);

app.use("/Oauth", Authrouter);

app.use("/room", authenticateToken, roomRouter);

app.use("/upload", authenticateToken, s3router);

console.log("server started");
console.log(`${process.env.FRONTEND_URL}/Oauth/callback`);
app.listen(3001);