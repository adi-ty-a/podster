import { DialogCloseButton } from "./dialog"

interface vairants{
    tittle:string,
    size:"sm"|"lg"
}

const vairants = {
    sm:"text-[26px]",
    lg:"text-4xl"
}

export const Header=({tittle,size}:vairants)=>{
    return <>
    <div className="flex pl-8 justify-between items-center w-full h-[10vh] bg-white border-b ">
              <div className={`text-black text-4xl ${vairants[size]}`}>{tittle}</div>
              <div className="flex justify-between items-center gap-6 pr-8">
              {tittle=="Podster" &&  <DialogCloseButton url={window.location.href}/>}
              <div className="size-[28px] bg-[#F2F2F2] rounded-full border"></div>
              </div>
            </div>
            </>
} 