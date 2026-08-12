"use client"
import { Mic, Phone } from "lucide-react"
import { Video } from "lucide-react"
import { motion } from "motion/react"
import JoinPodcastBtn from "./buttoncomponet"
import { Badge } from "../components/badge"
import { Startpod } from "./startpod"
import { WatchDemo } from "./watchDemo"
import { Socials } from "./socials"
import MenuBox from "./menubox";
import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StartFreeTrail } from "./startfreetrial";
import FeatureSection from "../testupload/page";
import { Chatbox, ClearnUi } from "./features";
import { TextAnimate } from "../components/text-animate";

const Home = () => {
  const [show,setclose] = useState(false);
  const router = useRouter()
    return (
      <div className=" relative w-full h-fit flex justify-center bg-[#FAFDFF]">
        {show && <div className="absolute w-screen h-full bg-white/80 backdrop-blur-lg z-30 md:hidden ">
          <div className="flex flex-col items-center justify-start py-10 gap-10 sticky">
                <div className=" flex font-semibold text-3xl">Podster <div><X onClick={()=>setclose(false)} className="absolute right-10 top-5"/></div></div>
                  <div className="text-lg text-[#6D6D6D]" onClick={()=>router.push("/signup")}>SignUp</div>
                  <div className="text-lg text-[#6D6D6D]">About</div>
          </div>
        </div>}
          <div className=" bg-[#FAFDFF] h-full max-w-[1200px] w-screen pt-1 px-1 pb-0 flex flex-col items-center">
            {/* headernav */}
              <div className="relative top-0 w-screen border-b flex justify-center bg-white/90 backdrop-blur-lg z-20 ">
                <div className="relative flex w-[90%] md:w-[80%] max-w-[1200px] justify-between items-center px-6 py-3  border-black/20">
                <div className="flex items-center justify-between gap-[20px]">
                <div className="relative  size-[40px] rounded-[14px] overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <div className="absolute -top-6  blur-[18px] w-[82px] h-[25px] bg-white z-1 flex " />
                    <img
                      src="logoimg.jpg"
                      alt="logo"
                      className="w-[70px] h-[70px] object-cover absolute -top-[15px] "
                      />
                  </div>
                      <div className="text-black text-2xl font-bold">Podster</div>
                      </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:flex justify-center gap-10 w-[460px] items-center hidden">
                  <div className="text-[14px] text-[#898989] font-semibold ">Home</div>
                  <div className="text-[14px] text-[#898989] font-semibold">Product</div>
                  <div className="text-[14px] text-[#898989] font-semibold">About</div>
                </div>
              <JoinPodcastBtn/>
              <MenuBox setfunction={setclose}/>
            </div>
                      </div>
            {/* image */}
       <div className="w-full relative pointer-events-none">
          <motion.img
            animate={{
              y: [-20, 20],
              rotate: [0, 10, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
            src="camera.png"
            className="hidden lg:block absolute size-[80px] lg:size-[100px] object-cover z-1 left-[10%] lg:left-[20%] top-14 opacity-80"
          />
          <motion.img
            animate={{
              y: [-20, 20],
              rotate: [0, -10, 0],
              transition: {
                delay: 1.5,
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
            src="mic.png"
            className="hidden lg:block absolute size-[80px] lg:size-[100px] object-cover z-1 right-[10%] lg:right-[20%] top-14 opacity-80"
          />
        </div>
            {/* <img src="sofa.png" className="absolute size-[100px] object-cover mask-b-from-30% mask-b-to-80% z-1 left-[45%] top-60 rotate-[145rad]"/>  */}
            {/* header */}
            <div className="relative flex flex-col gap-8 pt-20">
              {/* badge */}
                  <motion.div
                className="flex justify-center "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                  <Badge variant="pill" className="gap-2 px-2 py-1">
                    <motion.span
                      className="w-2 h-2 bg-red-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Work in Progress
                  </Badge>
                </motion.div>
              <div className="flex flex-col items-center justify-center">
                
                  <div className="text-black text-[60px] md:text-[80px] font-bold m-0 leading-none">Podcast</div>
                  <div className="text-[#ACACAC] text-[30px] md:text-[40px] font-bold m-0 leading-none">that just work</div>
              </div>
              <span className="text-[16px] text-[#ACACAC] w-[300px] md:w-[400px] h-fit flex text-center md:text-[18px] md:max-w-[550px]">Crystal-clear podcast recording for creators of any size. No downloads, no hassle—just seamless audio and video podcasting</span>
            <div className="flex gap-2 justify-center">
                  <Startpod/>
                  <WatchDemo/>
            </div>
            </div>
            {/* image */}
            <div className="pt-10 mask-b-from-60% mask-b-to-100% ">
              <div className="w-[390px] md:w-[800px] h-[400px] md:h-[500px] bg-[#f0f3f5] rounded-[34px]  shadow-[0_3px_5px_rgb(0,0,0,0.1)] flex flex-col items-center gap-[60px] md:gap-[80px] scale-75 md:scale-100 mx-auto">
                <div className=" flex justify-center gap-[30px] md:gap-[60px] pt-[34px]">
                  <div className="flex justify-center items-center bg-white w-[100px] md:w-[180px] h-[70px] md:h-[100px] rounded-[14px]  shadow-[0_3px_5px_rgb(0,0,0,0.1)] ">
                    <div className="size-[35px] md:size-[70px] bg-[#DBDBDB] rounded-full flex items-center justify-center text-[#6D6D6D] font-bold text-[12px] md:text-[24px]">AV</div>
                  </div>
                  <div className="flex justify-center items-center bg-white w-[100px] md:w-[180px] h-[70px] md:h-[100px] rounded-[14px]  shadow-[0_3px_5px_rgb(0,0,0,0.1)] ">
                    <div className="size-[35px] md:size-[70px] bg-[#DBDBDB] rounded-full flex items-center justify-center text-[#6D6D6D] font-bold text-[12px] md:text-[24px]">ZO</div>
                  </div>
                  <div className="flex justify-center items-center bg-white w-[100px] md:w-[180px] h-[70px] md:h-[100px] rounded-[14px]  shadow-[0_3px_5px_rgb(0,0,0,0.1)] ">
                    <div className="size-[35px] md:size-[70px] bg-[#DBDBDB] rounded-full flex items-center justify-center text-[#6D6D6D] font-bold text-[12px] md:text-[24px]">DF</div>
                  </div>
                </div>
                <div className="w-[200px] md:w-[250px] h-[60px] md:h-[70px] bg-white rounded-full shadow-[0_3px_5px_rgb(0,0,0,0.1)] flex items-center justify-around px-4">
                  <div className="relative size-[40px] md:size-[45px] bg-black rounded-full text-white flex justify-center items-center shadow-[0_3px_5px_rgb(0,0,0,0.2)]">
                    <span className=" absolute h-[45%] bg-linear-to-b from-white/50 via-white/10 to-transparent  w-full top-0"></span>
                    <Video className="w-4 h-4 md:w-5 md:h-5"/>
                  </div>
                  <div className="relative size-[40px] md:size-[45px] bg-black rounded-full text-white flex justify-center items-center shadow-[0_3px_5px_rgb(0,0,0,0.2)]">
                    <span className=" absolute h-[45%] bg-linear-to-b from-white/50 via-white/10 to-transparent  w-full top-0"></span>
                    <Mic className="w-4 h-4 md:w-5 md:h-5"/>
                  </div>
                  <div className="relative size-[40px] md:size-[45px] bg-red-500 rounded-full text-white flex justify-center items-center shadow-[0_3px_5px_rgb(0,0,0,0.2)]">
                    <span className=" absolute h-[45%] bg-linear-to-b from-white/50 via-white/10 to-transparent  w-full top-0"></span>
                    <Phone className="w-4 h-4 md:w-5 md:h-5"/>
                  </div>
                </div>
              </div>
            </div>
            {/* features */}
            <div className="h-fit py-[200px] w-screen bg-black flex flex-col items-center justify-center gap-[60px]">
              <div className="flex flex-col items-center justify-center gap-3 size-fit pb-[120px]">
                <div className="text-[38px] leading-[38px] font-bold text-center bg-[linear-gradient(180deg,_#fff_-12%,_#9F9F9F_134%)] bg-clip-text text-transparent">Build for Conversations</div>
                <div className="text-[24px] leading-[24px] font-bold text-center bg-[linear-gradient(180deg,_#fff_-12%,_#9F9F9F_134%)] bg-clip-text text-transparent ">That Matter</div>
              </div>
              <div className="w-screen h-full flex md:[perspective:1000px] flex-col items-center justify-center bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.2)_0_6px,transparent_6px_12px),repeating-linear-gradient(90deg,rgba(255,255,255,0.2)_0_6px,transparent_6px_12px)] bg-[length:100%_1px,100%_1px] bg-[position:top,bottom] bg-no-repeat">
                  <div className="flex h-full w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.2)_0_6px,transparent_6px_12px)] bg-[length:100%_1px] bg-[position:bottom] bg-no-repeat">
                    <div className="flex-[1.1] py-[80px] h-full flex justify-end pr-[90px]">
                      <ClearnUi/>
                    </div>
                    <div className="w-[1px] bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.2)_0_6px,transparent_6px_12px)] bg-[length:1px_100%] bg-right bg-no-repeat"></div>
                    <div className="flex-1 flex flex-col justify-center pl-[80px] gap-[20px] -translate-y-10">
                        <div className="text-[#ACACAC] w-[60%]">
                          <div className="-translate-x-4 -translate-y-1 size-[15px] bg-[#404040]"/>
                          <TextAnimate className="text-white"  animation="blurInUp" by="word" delay={0.8}>
                            Forget complicated setups and endless configuration. Create a room, share a link, and start your meeting instantly—no downloads, no technical hurdles.
                          </TextAnimate>
                        </div>
                        <div className="text-[#ACACAC] w-[60%]">
                          <div className="-translate-x-4 -translate-y-1 size-[15px] bg-[#404040]"/>
                          <TextAnimate className="text-white" animation="blurInUp" by="word" delay={1.6}>
                            Create. Share. Connect. Secure, high-quality video meetings with just a single link
                          </TextAnimate>
                        </div>
                    </div>
                  </div>
                  <div className="flex w-full h-full">
                    <div className="flex-1 flex flex-col justify-center pr-[80px] gap-[20px] -translate-y-10 items-end">
                        <div className="text-[#ACACAC] w-[60%]">
                          <div className="-translate-x-4 -translate-y-1 size-[15px] bg-[#404040]"/>
                          <TextAnimate className="text-white"  animation="blurInUp" by="word" delay={0.8}>
                            Stay connected with real-time messaging alongside every video call.
                          </TextAnimate>
                        </div>
                        <div className="text-[#ACACAC] w-[60%]">
                          <div className="-translate-x-4 -translate-y-1 size-[15px] bg-[#404040]"/>
                          <TextAnimate className="text-white"  animation="blurInUp" by="word" delay={1.2}>
                            Keep everyone involved with instant messaging that lets participants contribute without waiting for the right moment to speak.
                          </TextAnimate>
                        </div>
                    </div>
                    <div className="w-[1px] bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.2)_0_6px,transparent_6px_12px)] bg-[length:1px_100%] bg-right bg-no-repeat"></div>
                    <div className="flex-1 py-[80px] pl-[80px]">
                      <Chatbox/>
                    </div>
                  </div>
              </div>
            </div>

            {/* Steps */}
            <FeatureSection/>
            <div className="h-[550px] md:h-[650px] w-screen flex items-center justify-center ">
              <div className="rounded-2xl bg-black h-[450px] md:h-[500px] w-[90%] flex flex-col gap-6 items-center justify-center">
                  <div className="text-2xl md:text-6xl font-bold text-white max-w-[350px] md:max-w-3xl text-center">Ready to transform your meetings?</div>
                  <div className="text-[12px] md:text-lg font-normal text-white max-w-[300px] md:max-w-3xl text-center ">Join users already using Callify for seamless video communication. Start your free trial today.</div>
                    <StartFreeTrail/>
              </div>
            </div>
            {/* footer */}
            <div className="bg-black w-screen border-t md:h-[400px] flex flex-col  justify-between px-[20px] md:px-[200px] py-[40px] md:py-[60px] h-fit md:gap-0 gap-10">
              <div className="w-full h-full flex justify-between md:flex-row flex-col md:gap-0 gap-10">
                <div className="flex flex-col items-start justify-start gap-4 ">
                  <div className="text-[#999999] text-[14px] md:text-[16px] ">CONTACT ME</div>
                  <div className="w-[300px] md:w-[400px] h-fit font-bold text-2xl md:text-4xl text-white">Let's Discuss Your Vision. With Me.</div>
                  <button className="mt-2 relative overflow-hidden rounded-lg bg-[#363636] px-[14px] md:px-[16px] py-[8px] md:py-[10px] text-[12px] md:text-[14px] text-white w-fit h-fit shadow-[0_3px_10px_rgb(0,0,0,0.2)]  z-2">
                    adi.personal.13@gmail.com
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-[14px] md:text-[16px] text-[#999999]">QUICK LINKS</div>
                  <div className="text-[14px] md:text-[16px] text-white">About me</div>
                  <div className="text-[14px] md:text-[16px] text-white">Github</div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-[#9F9F9F] text-xs md:text-sm">© 2025 Podster. All rights reserved</div>
                  <Socials/>
              </div>
            </div>
          </div>  
          </div>
    )
  }
  export default Home