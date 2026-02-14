"use client"
import { Github, Linkedin, Twitter } from "lucide-react";
import { useRouter } from "next/navigation"
export function Socials(){
    const styles = "scale-110 transition ease-in-out duration-300"

    const router = useRouter()
    return      <div className="flex gap-[30px]">
                  <Github color="#9F9F9F" onClick={()=>router.push(process.env.NEXT_PUBLIC_GITHUB!)} className={styles}/>
                  <Twitter color="#9F9F9F" onClick={()=>router.push(process.env.NEXT_PUBLIC_X!)} className={styles}/>
                  <Linkedin color="#9F9F9F" onClick={()=>router.push(process.env.NEXT_PUBLIC_LINKEDIN!)} className={styles}/>
                </div>
}