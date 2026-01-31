"use client"
import { Button } from "@/components/ui/button"
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
export function RoomNameDialog() {
    const router =  useRouter()
    const Roomname = useRooom((state)=>state.roomname)
    const RoomId = useRooom((state)=>state.setrooId);
    const createroom = async ()=>{
            console.log(Roomname);
            const res = await axios.post( `${process.env.NEXT_PUBLIC_BACKEND_URL}/room/create`,{
              roomname:Roomname
            },{
            headers:{
            "Authorization":"Bearer " + localStorage.getItem("token")
            }
          }
          ) 
            if(res.data.success){
              const roomid = res.data.data.roomId;
              RoomId(roomid);
              if(Roomname !== null && Roomname.length > 3){
                router.push("/room/"+roomid+"/"+Roomname)
              }
            }else{
              console.log("error white creating the room");
            }
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
            <Quickactions variant="create"/>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
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
            onClick={createroom}
            >
              Create
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
