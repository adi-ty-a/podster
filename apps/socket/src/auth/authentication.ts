import { Server, Socket } from "socket.io";
import cookie from "cookie"
import jwt from "jsonwebtoken"

export const isauthenticated=(Socket:Socket)=>{
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