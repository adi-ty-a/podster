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
    recordingProgress:number,
    isUploading:boolean,
    filename:String | null,
    setFileName:(name:string|null)=>void,
    setUploading:()=>void,
    setisrecording:(value:boolean)=>void
    setRecordingProgress:(value:number)=>void
}

export const useRecording = create<recording>((set)=>({
    isrecording:false,
    recordingProgress:0,
    isUploading:false,
    filename:null,
    setFileName:(name:string|null)=>set(()=>({filename:name})),
    setUploading:()=>set((state)=>({isUploading:!state.isUploading})),
    setisrecording:(value:boolean)=>set(()=>({isrecording:value})),
    setRecordingProgress:(value:number)=>set(()=>({recordingProgress:value}))
}))

type chat={
    chat:boolean
    togglechat:()=>void
}

export const useChat = create<chat>((set)=>({
    chat:true,
    togglechat:()=>set((state)=>({chat:!state.chat}))
}))
