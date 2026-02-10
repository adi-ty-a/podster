"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login(){
    const router = useRouter();
    const [email,setemail]= useState("");
    const [password,setpassword]= useState(""); 
    const [error,seterror] = useState(false);
    const getresponse =async()=>{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`,{email,password})
        if(response.data.success){
            router.push('/dashboard');
            seterror(false);
        }else{
            seterror(true);
        }
    }

    return <div className="realtive w-screen h-screen flex justify-center items-center py-6 bg-white">
            <div className="w-[365px] bg-[#F5F5F5] h-fit  flex flex-col items-center justify-center rounded-t-[24px] rounded-b-[14px]">
                <div className="w-[350px] flex flex-col h-fit justify-center pt-2">
                 <Card className="w-full max-w-sm rounded-t-[24px]">
                    <CardHeader>
                        <div className="flex items-center justify-center flex-col">
                            <div className="relative  size-[50px] rounded-[14px] overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-4">
                                <div className="absolute -top-6  blur-[18px] w-[82px] h-[25px] bg-white z-1 flex " />
                                <img
                                    src="logoimg.jpg"
                                    alt="logo"
                                    className="w-[90px] h-[90px] object-cover absolute -top-[20px] "
                                    />
                            </div>
                            <CardTitle className="text-xl">Signup to Podster</CardTitle>
                            <CardDescription className="text-sm">
                            Please login to start podcasting
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="flex flex-col gap-2">
                            <div className="grid gap-2">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                required
                                onChange={(e)=>{
                                    setemail(e.target.value)
                                }}
                                />
                            </div>
                            <div className="grid gap-2">
                            <Input id="password" type="password" placeholder="Password" required 
                                onChange={(e)=>{
                                    setpassword(e.target.value)
                                }}/>
                            <div className="flex items-center justify-start">
                                {error && <div className="text-[12px] w-full flex text-red-400">SignUp failed retry later</div>}
                            </div>
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full" onClick={getresponse}>
                        Sign-up
                        </Button>
                        <Button variant="outline" className="w-full" onClick={()=>{
                        }}>
                        Sign-up using <FcGoogle/>
                        </Button>
                    </CardFooter>
                </Card>
                    <div className="h-[50px] flex justify-center items-center gap-1">
                            <p className="text-sm text-[#B7B6B8]">Already have accound ?</p>
                            <Button className="text-sm p-0 cursor-pointer" variant="link" onClick={()=>{
                                router.push("/login")
                            }}>Login</Button>
                    </div>
                </div>
            </div>
            </div>
}