import express, { type Response } from "express";
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
    origin: [
        "https://podster.byadi.me",
        "http://localhost:3000"
    ],
    credentials: true
}))
app.get("/getcredentials",async (req,res:Response)=>{
    const response = await fetch(`https://rtc.live.cloudflare.com/v1/turn/keys/${process.env.CLOUDFLARE_TURN_KEY_ID}/credentials/generate-ice-servers`,{
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_TURN_API_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ttl: 3600, 
        }),
    })
    if(!response.ok){
        const error = await response.text();
        return res.status(response.status).send(error);
    }
    const data = await response.json()
    console.log(data);
    return res.json(data);
})

app.get("/status", (req, res) => {
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

app.listen(3001);