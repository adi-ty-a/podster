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
import JoinBox from "./QuickActionBox/JoinRoom"
import { useState } from "react"
export function JoinRoomDialog() {
    const [link, setlink] = useState("");
    const createroom = async () => {
        try {
            if (link.length > 20) {
                window.location.href = link;
            }
        } catch (e) {
            console.log("error white creating the room");
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="w-full">
                    <div className="w-full hidden md:block">
                        <JoinBox />
                    </div>
                    <div className="w-full flex flex-col md:hidden bg-[#FF5B5B] h-[200px] rounded-[32px] justify-start pt-[24px] px-[36px]">
                        <div className="text-white font-bold text-[42px]">RECORDINGS</div>
                        <div className="w-[65%] text-white">create room or join using the code</div>
                        <div className="w-full flex justify-end">
                            <div className="bg-[#3F3F3F] text-white text-lg px-10 py-2 rounded-2xl">Join</div>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md w-[92vw] max-w-[440px] rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Join Room</DialogTitle>
                    <DialogDescription>
                        Enter Join link
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only block sm:hidden">
                        </Label>
                        <Input
                            id="link"
                            placeholder="LINK"
                            onChange={(e) => {
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
                        onClick={createroom}
                    >
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
