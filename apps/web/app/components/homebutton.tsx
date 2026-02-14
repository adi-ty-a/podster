import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export type HButtonProps ={
    tittle?:string,
    icon?:()=>void, 
    vairant:string
} & React.ButtonHTMLAttributes<HTMLButtonElement>
export default function HButton({tittle,vairant,className,...props}:HButtonProps){ 
        if(vairant == "black"){
            console.log(className)
        return <>
                <button {...props} className={`relative overflow-hidden rounded-lg bg-black px-[16px] py-[10px] text-[12px] text-white w-fit h-fit shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:scale-105 transition duration-300 ease-in-out z-2 ${className}`}>
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[45%]
                bg-gradient-to-b from-white/30 via-white/10 to-transparent ">
                </span>
                {tittle}
                </button>
            </>
        }else{
        return <>
                <button className={`relative overflow-hidden rounded-lg  px-[16px] py-[10px] text-[12px] text-black w-fit h-fit border-1 bg-white z-2 shadow-[0_3px_50px_rgb(0,0,0,0.1)] hover:scale-105 transition duration-300 ease-in-out ${className}`}>
                    {tittle}
                </button>
            </>
        }

}