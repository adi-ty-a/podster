"use client"

import { useState } from "react";
import { Nav_box } from "../../components/nav_box"

export default function ToggleNavBox(){
const [navselection,setnavselection] = useState<string>("Recordings/");

    const togglebutton=()=>{
    if(navselection == "Recordings"){
        setnavselection("Chats")
    }else{
        setnavselection("Recordings")
    }
}
return <div>
        <Nav_box tittle="Recordings" navselection={navselection}  togglebutton={togglebutton}/>
        <Nav_box tittle="Chats" navselection={navselection}togglebutton={togglebutton}/>
       </div>
}