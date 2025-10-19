        import { rtc } from "./logic";
        import { io } from "socket.io-client";

            const server = io("http://localhost:3001")
        export function Connect(tracks:MediaStream,action:"join"|"create",roomid?:string,){
            const newrtc : rtc = new rtc(tracks,server)
            if(action == "create"){
                const res = server.emit("create")
                console.log("sent")
            }else if(action == "join"){
                const res = server.emit("join",{roomid})
            }
            if(roomid){
            newrtc.roomid = roomid
            }
            server.on("roomid",(roomid)=>newrtc.roomid = roomid)
            server.on("send-offer",(data)=>  newrtc.createPeerConnection(true,data.roomid))
            server.on("Offer",(msg) =>  newrtc.handleVideoOfferMsg(msg))
            server.on("answer",(msg) => newrtc.handleVideoAnswerMsg(msg))
            server.on("new-ice-candidate",(msg) => newrtc.handleNewICECandidateMsg(msg))

        } 