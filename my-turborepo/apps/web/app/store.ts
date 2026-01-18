import { create } from "zustand"

type room={
    roomname:string | null
    setroomname:(roomname:string)=>void;
} 

export const useRooom = create<room>((set)=>({
    roomname:null,
    setroomname:(roomname:string)=>set(()=> ({roomname:roomname}))
}))


type recording={
    isrecording:boolean;
    setisrecording:(value:boolean)=>void
}

export const useRecording = create<recording>((set)=>({
    isrecording:false,
    setisrecording:(value:boolean)=>set(()=>({isrecording:value}))
}))