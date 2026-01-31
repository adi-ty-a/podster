"use client"
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
export default function Recording({urls,name,setboxstate}:{urls:string[],name:string,setboxstate:Dispatch<SetStateAction<boolean>>}){
    // const boxstate = userecBox().setRECboxstate
                const download=(url:string)=>{
                    const a = document.createElement("a");
                    a.href = url!;
                    a.download = name+"webm"
                    document.body.appendChild(a);
                    a.click()
                    document.body.removeChild(a);
                }
    return  <div className="absolute right-25 z-2">
                <div className=" bg-[#EBEBEB] w-[200px] px-2 py-3 rounded-2xl border flex  items-start justify-center flex-col">
                    <div className="flex justify-between w-full font-bold px-2 mb-2 items-center ">Downlaods<X size={14} className="cursor-pointer hover:bg-white rounded-sm" onClick={()=>setboxstate(false)}/></div>
                        { urls.map((e,i)=>{
                            return <div className="bg-[#FAFAFA] text-black rounded-[12px] border w-full h-fit px-2 py-2 font-light cursor-pointer  hover:bg-white"
                                onClick={()=>download(e)}
                            >{name}{i}.webm</div>
                        })}
                </div>
            </div> 
}