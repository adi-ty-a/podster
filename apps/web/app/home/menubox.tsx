import { Menu } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
export default function MenuBox({setfunction}:{setfunction:Dispatch<SetStateAction<boolean>>}){

    const menuicon= () =>{ 
        return <Menu className="md:hidden block" onClick={()=>setfunction(true)} color="#6D6D6D"/>
    }

    return menuicon()  
} 