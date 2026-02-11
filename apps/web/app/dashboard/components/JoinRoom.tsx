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
import { Button } from "@/components/ui/button"
import { useState } from "react"

const JoinRoom = ()=>{
    const router =  useRouter();
    const [link,setlink] = useState("")
    const [failed,setfailed] = useState(false); 
    const JoiningRoom =()=>{
       router.push(link);
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
                setlink(e.target.value);
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