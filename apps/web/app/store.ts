import { create } from "zustand"

type videoRender={
    isRemoteVideoEnabled:boolean,
    islocalVideoEnabled:boolean,
    setisRemoteVideoEnabled:(value:boolean)=>void;
    setislocalVideoEnabled:(value:boolean)=>void;
}

export const useVideoRender= create<videoRender>((set)=>({
    isRemoteVideoEnabled:true,
    islocalVideoEnabled:true,
    setisRemoteVideoEnabled:(value:boolean)=>set(()=>({isRemoteVideoEnabled:value})),
    setislocalVideoEnabled:(value:boolean)=>set(()=>({islocalVideoEnabled:value})),
    })
    )

type room={
    roomId:string | undefined,
    roomname:string ,
    setroomname:(roomname:string)=>void;
    setrooId:(roomId:string)=>void;
} 

export const useRooom = create<room>((set)=>({
    roomId:undefined,
    roomname:"Podcast-001",
    setroomname:(roomname:string)=>set(()=> ({roomname:roomname})),
    setrooId:(roomId:string|undefined)=>set(()=> ({roomId:roomId}))
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


