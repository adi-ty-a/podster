import { useRouter } from "next/navigation";
import HButton from "../components/homebutton";

export function Startpod(){
    const router = useRouter()
    return <HButton tittle="Start Podcasting" vairant="white" onClick={()=>{
        console.log("start")
        router.push("/signup")}}/>
}