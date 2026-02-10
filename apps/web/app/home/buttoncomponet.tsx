import HButton from "../components/homebutton"
import { useRouter } from "next/navigation"
export default function JoinPodcastBtn(){
    const router = useRouter()
    return <HButton        
        tittle="Join Podcast"
        vairant="black" 
        onClick={()=>router.push("/login")}
        />
}