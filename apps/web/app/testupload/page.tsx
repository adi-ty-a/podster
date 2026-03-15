"use client"
export default function Testuploading(){
    const cn = (...classes:string[])=> classes.join(" ");

    return  <div className="bg-black w-screen h-screen flex items-center justify-center">
                <div className={cn("bg-white rounded-2xl min-h-100 w-[80%]",
                "bg-[radial-gradient(#000_1px,transparent_1px)]",
                "[background-size:10px_10px]"
                )}></div>
            </div>
}