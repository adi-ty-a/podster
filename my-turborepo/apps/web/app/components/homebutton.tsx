export default function HButton({tittle,vairant}:{tittle:string,vairant:string}){ 


        if(vairant == "black"){
        return <>
                <button className="relative overflow-hidden rounded-lg bg-black px-[16px] py-[10px] text-[14px] text-white w-fit h-fit shadow-[0_3px_10px_rgb(0,0,0,0.2)]  z-2">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[45%]
                bg-gradient-to-b from-white/30 via-white/10 to-transparent ">
                </span>
                {tittle}
                </button>
            </>
        }else{
        return <>
                <button className="relative overflow-hidden rounded-lg  px-[16px] py-[10px] text-[14px] text-black w-fit h-fit border-1 bg-white z-2 shadow-[0_3px_50px_rgb(0,0,0,0.1)]">
                    {tittle}
                </button>
            </>
        }

}