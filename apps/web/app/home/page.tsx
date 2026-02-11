"use client"
import HButton from "../components/homebutton"
import { Linkedin, Phone } from "lucide-react"
import { Mic } from "lucide-react"
import { Video } from "lucide-react"
import { Twitter} from "lucide-react"
import { Github } from "lucide-react"
import { User } from "lucide-react"
import PauseIcon from '@mui/icons-material/Pause';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { SendHorizonal } from "lucide-react"
import { MessageCircle } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import JoinPodcastBtn from "./buttoncomponet"
import { Badge } from "../components/badge"
import { ArrowRight } from "lucide-react"
import { FaPlay } from "react-icons/fa";

const Home = () => {

  const router  = useRouter()
    return (
      <div className="w-full h-fit flex justify-center bg-[#FAFDFF]">
          <div className=" bg-[#FAFDFF] h-full max-w-[1200px] w-screen p-1 flex flex-col items-center">
            {/* headernav */}
              <div className="sticky top-0 w-screen border-b flex justify-center bg-white/90 backdrop-blur-lg z-20 ">
                <div className="relative flex w-[80%] max-w-[1200px] justify-between items-center px-6 py-3  border-black/20">
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
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center gap-10 w-[460px] md:visible items-center">
                  <div className="text-[14px] text-[#898989] font-semibold ">Home</div>
                  <div className="text-[14px] text-[#898989] font-semibold">Product</div>
                  <div className="text-[14px] text-[#898989] font-semibold">About</div>
                </div>
              <JoinPodcastBtn/>
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
                
                  <div className="text-black text-[80px] font-bold m-0 leading-none">Podcast</div>
                  <div className="text-[#ACACAC] text-[40px] font-bold m-0 leading-none">that just work</div>
              </div>
              <span className="text-[18px] text-[#ACACAC] w-[550px] h-fit flex text-center">Crystal-clear podcast recording for creators of any size. No downloads, no hassle—just seamless audio and video podcasting</span>
            <div className="flex gap-2 justify-center">
                  <HButton tittle="Start Podcasting" vairant="white"/>
                  <HButton tittle="Watch Demo"vairant="black"/>
            </div>
            </div>
            {/* image */}
            <div className="pt-10 mask-b-from-60% mask-b-to-100% ">
              <div className="w-[800px] h-[500px] bg-[#f0f3f5] rounded-[34px]  shadow-[0_3px_5px_rgb(0,0,0,0.1)] flex flex-col items-center gap-[80px]">
                <div className=" flex justify-center gap-[60px] pt-[34px]">
                  <div className="flex justify-center items-center bg-white w-[180px] h-[100px] rounded-[14px]  shadow-[0_3px_5px_rgb(0,0,0,0.1)] ">
                    <div className="size-[70px] bg-[#DBDBDB] rounded-full flex items-center justify-center text-[#6D6D6D] font-bold text-[24px]">AV</div>
                  </div>
                  <div className="flex justify-center items-center bg-white w-[180px] h-[100px] rounded-[14px]  shadow-[0_3px_5px_rgb(0,0,0,0.1)] ">
                    <div className="size-[70px] bg-[#DBDBDB] rounded-full flex items-center justify-center text-[#6D6D6D] font-bold text-[24px]">ZO</div>
                  </div>
                  <div className="flex justify-center items-center bg-white w-[180px] h-[100px] rounded-[14px]  shadow-[0_3px_5px_rgb(0,0,0,0.1)] ">
                    <div className="size-[70px] bg-[#DBDBDB] rounded-full flex items-center justify-center text-[#6D6D6D] font-bold text-[24px]">DF</div>
                  </div>
                </div>
                <div className="w-[250px] h-[70px] bg-white rounded-full shadow-[0_3px_5px_rgb(0,0,0,0.1)] flex items-center justify-around px-4">
                  <div className="relative size-[45px] bg-black rounded-full text-white flex justify-center items-center shadow-[0_3px_5px_rgb(0,0,0,0.2)]">
                    <span className=" absolute h-[45%] bg-linear-to-b from-white/50 via-white/10 to-transparent  w-full top-0"></span>
                    <Video/>
                  </div>
                  <div className="relative size-[45px] bg-black rounded-full text-white flex justify-center items-center shadow-[0_3px_5px_rgb(0,0,0,0.2)]">
                    <span className=" absolute h-[45%] bg-linear-to-b from-white/50 via-white/10 to-transparent  w-full top-0"></span>
                    <Mic/>
                  </div>
                  <div className="relative size-[45px] bg-red-500 rounded-full text-white flex justify-center items-center shadow-[0_3px_5px_rgb(0,0,0,0.2)]">
                    <span className=" absolute h-[45%] bg-linear-to-b from-white/50 via-white/10 to-transparent  w-full top-0"></span>
                    <Phone/>
                  </div>
                </div>
              </div>
            </div>
            {/* features */}
            <div className="h-[800px] w-screen bg-[#F0F3F5] flex flex-col items-center justify-center gap-[60px]">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-black text-4xl font-bold">Everything you need for</div>
                    <div className="text-4xl font-bold text-[#737373]">seamless meetings</div>
                </div>
              <div className="">
              <div className="w-[620px] text-md font-semibold text-center text-black/50">Powerful features designed to make your video calls more productive, secure, and enjoyable.</div>
              </div>
              </div>
              <div className="w-fit max-w-[1200px] flex gap-8 [perspective:1000px] ">
              {/* cleanui */}
                  <div className="  w-[340px] h-[450px] bg-black rounded-4xl  transform rotate-y-40 -rotate-x-10 hover:rotate-x-0 hover:rotate-y-0 hover:scale-110 transition ease-in-out duration-300 ">
                      <div className="relative w-full h-[85%] bg-white rounded-3xl  flex flex-col items-center justify-center gap-2 ">
                        <div className="absolute bg-[#FFC9C9] w-[50px] h-[40px] z-2 rounded-lg flex items-center justify-center text-red-700 text-lg top-4 right-5"> live</div>
                      <div className=" bg-[#D9D9D9] relative h-[80%] w-[90%] rounded-tl-[12px] rounded-tr-none rounded-bl-[12px] rounded-br-[12px]  flex items-center justify-center ">
                          <div className=" cleanui absolute bg-white w-[60px] h-[50px] top-0 right-0 rounded-bl-[12px] "></div>
                          <img className="translate scale-80" src="UserIcon.png" alt="" />
                        </div>
                        <div className="w-full px-4 flex gap-2 justify-between">
                            <div className="flex gap-2">
                              <div className="bg-black size-[40px] rounded-lg flex items-center justify-center">
                                <User color="white"/>
                              </div>
                              <div className="font-bold ">@avi</div>
                            </div>
                            <div className="text-sm text-[#999999] pr-2">12m ago</div>
                        </div>
                      </div>
                      <div className="text-white w-full flex items-center justify-center pt-2 text-2xl">
                        Clean UI
                      </div>
                  </div>
                <div className="flex flex-col gap-2">
                  
                  <div className="w-[340px] h-[450px] bg-white flex flex-col items-center justify-center rounded-2xl shadow-[0_0px_px_rgb(0,0,0,0.1)] hover:scale-110 transition ease-in-out duration-300">
                    <div className="w-[80%] h-[200px] rounded-3xl bg-[#D9D9D9] flex items-center justify-center ">
                      <FaPlay size={60}/>
                    </div>
                    <div className="w-[340px] h-[100px] rounded-2xl bg-white flex items-center justify-center gap-3 px-6">
                        <div className="h-[50px] w-[80px] bg-[#D9D9D9] rounded-2xl flex items-center justify-center"><CallEndIcon style={{ color: "#1D1B20", fontSize: "30px"  }}  /></div>
                        <div className="h-[50px] w-[80px] bg-[#FF9494] rounded-2xl flex items-center justify-center"> <div className="size-[30px] rounded-full bg-radial from-white to-50% to-red-500"></div> </div>
                        <div className="h-[50px] w-[80px] bg-[#D9D9D9] rounded-2xl flex items-center justify-center"><PauseIcon style={{ color: "#1D1B20", fontSize: "30px"  }} /></div>
                    </div>
                    <div className="relative flex flex-col justify-center gap-2 h-[110px] items-start w-[85%] bg-black rounded-xl p-4">
                      <span className=" absolute h-[45%] bg-linear-to-b from-white/50 via-white/10 to-transparent left-0 w-full -top-3"></span>
                      <div className="text-white text-xl w-full font-semibold">Built-in Call Recording</div>
                      <div className="w-full text-sm text-white font-light">Record video calls and share recordings anytime.</div>
                    </div>
                  </div>

                   {/* <div className="relative w-[340px] h-[220px] bg-black flex flex-col items-center rounded-2xl shadow-[0_0px_px_rgb(0,0,0,0.1)]  overflow-hidden">
                      <img className="absolute -top-[60px] translate-0 scale-105" src="mp4_box.png"/>
                   </div> */}
                </div>

                <div className="relative flex flex-col w-[340px] h-[450px] bg-black rounded-4xl shadow-[0_0px_5px_rgb(0,0,0,0.1)] transform -rotate-x-10 -rotate-y-40 hover:rotate-x-0 hover:rotate-y-0 hover:scale-110 transition ease-in-out duration-300 ">
                  <div className="absolute h-[100px] w-[200px] bg-white/50 blur-[50px] -top-[80px] left-1/2 -translate-x-1/2"></div>
                  <div className="flex flex-1 gap-2 w-full text-white font-bold text-2xl px-4 items-center"><MessageCircle/>Real Time Chat</div>
                  <div className="w-full h-[350px] bg-white rounded-4xl shadow-[0_-10px_40px_rgb(252,252,252,.6)]">
                    <div className="h-full w-full px-3 py-4 flex flex-col gap-2">
                      <div className="bg-black text-md w-fit px-2 py-2 rounded-[8px] text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">Good morning</div>
                      <div className="bg-black text-md w-fit px-2 py-2 rounded-[8px] text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">Did you complete the task ?</div>
                      <div className="text-black text-sm text-shadow-2xs">12:30</div>
                      <div className="bg-white text-md w-fit px-2 py-2 rounded-[8px] text-black shadow-[0_3px_10px_rgb(0,0,0,0.2)] ml-auto">Morning, wokring on it.</div>
                      <div className="text-black text-sm ml-auto text-shadow-2xs">12:55</div>
                      <div className="bg-black text-md w-fit px-2 py-2 rounded-[8px] text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">let me know if you need help</div>
                      <div className="text-black text-sm text-shadow-2xs">12:56</div>
                      <div className="w-full h-[80px] rounded-2xl bg-[#D9D9D9] text-black/40 flex items-center px-3 justify-between">Message..
                        <div className="w-[35px] h-[80%] bg-black rounded-full flex items-center justify-center"><SendHorizonal color="white"/></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[650px] w-screen flex items-center justify-center ">
              <div className="rounded-2xl bg-black h-[500px] w-[90%] flex flex-col gap-6 items-center justify-center">
                  <div className="text-6xl font-bold text-white max-w-3xl text-center">Ready to transform your meetings?</div>
                  <div className="text-lg font-normal text-white max-w-3xl text-center ">Join users already using Callify for seamless video communication. Start your free trial today.</div>
                  <button className="text-black bg-white rounded-2xl px-8 py-4 text-lg font-bold flex items-center gap-2 transition ease-in-out duration-500 hover:scale-110 hover:bg-red-400 cursor-pointer ">Start free trial<ArrowRight/></button>
              </div>
            </div>
            {/* footer */}
            <div className="w-screen border-t h-[400px] flex flex-col max-w-[1200px] justify-between px-[100px] py-[60px] ">
              <div className="w-full h-full flex justify-between">
                <div className="flex flex-col items-start justify-start gap-4 ">
                  <div className="text-[#999999] text-[16px] ">CONTACT ME</div>
                  <div className="w-[400px] h-fit font-bold text-4xl">Let’s Discuss Your Vision. With Me.</div>
                  <button className="mt-2 relative overflow-hidden rounded-lg bg-[#999999] px-[16px] py-[10px] text-[14px] text-white w-fit h-fit shadow-[0_3px_10px_rgb(0,0,0,0.2)]  z-2">
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-[45%]
                    bg-gradient-to-b from-white/30 via-white/10 to-transparent ">
                    </span>
                    adi.personal.13@gmail.com
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-[16px] text-[#999999]">QUICK LINKS</div>
                  <div className="text-[16px] text-black">About me</div>
                  <div className="text-[16px] text-black">Github</div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-[#9F9F9F]">© 2025 Podster. All rights reserved</div>
                <div className="flex gap-[30px]">
                  <Github color="#9F9F9F"/>
                  <Twitter color="#9F9F9F"/>
                  <Linkedin color="#9F9F9F"/>
                </div>
              </div>
            </div>
          </div>  
          </div>
    )
  }

  export default Home