"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Quickactions } from "./QuickActionBox/Quickactions"
import { useRouter } from "next/navigation"
import { useRooom } from "../../store";
import axios from "axios";
import { Button } from "@/components/ui/button"
import { useState } from "react"

const JoinRoom = ()=>{
    const router =  useRouter();
    const Roomname = useRooom((state)=>state.roomname);
    const setroomname = useRooom((state)=>state.setroomname); 
    const setRoomId = useRooom((state)=>state.setrooId);
    const [failed,setfailed] = useState(false); 
    const roomId=""
    const JoiningRoom =async()=>{
        try{
            setfailed(false)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room/join`,{
                roomId:roomId,
            },{withCredentials:true})
            if(res.status == 200 && Roomname && roomId){
                router.push("/room/"+roomId+"/"+Roomname)
            }
        }catch(e){
            setfailed(true);
        }
    }

    return <>
        <Dialog>
      <DialogTrigger asChild>
        <div>
            <Quickactions variant="create"/>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          {failed && <div className="text-red-600">Failed to join</div> }
          <DialogDescription>
            Enter room name 
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Roomname
            </Label>
            <Input
              id="link"
              defaultValue="Podcast-001"
              onChange={(e)=>{
                setroomname(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
            <Button type="button" variant="default"
            onClick={JoiningRoom}
            >
              Join
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog></>
}

export default JoinRoom