import { create } from "zustand"

type room={
    roomId:string | null,
    roomname:string | null,
    setroomname:(roomname:string)=>void;
    setrooId:(roomId:string)=>void;
} 

export const useRooom = create<room>((set)=>({
    roomId:null,
    roomname:null,
    setroomname:(roomname:string)=>set(()=> ({roomname:roomname})),
    setrooId:(roomId:string|null)=>set(()=> ({roomId:roomId}))
}))

type recording={
    isrecording:boolean;
    setisrecording:(value:boolean)=>void
}

export const useRecording = create<recording>((set)=>({
    isrecording:false,
    setisrecording:(value:boolean)=>set(()=>({isrecording:value}))
}))