import { MessageCircle, SendHorizonal, User } from "lucide-react"
import { motion } from "motion/react"

export const Chatbox=()=>{
    return                 <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="mask-[linear-gradient(90deg,black,transparent)] relative flex flex-col w-[300px] md:w-[340px] h-[400px] md:h-[450px] bg-black rounded-4xl shadow-[0_0px_5px_rgb(0,0,0,0.1)] overflow-hidden border-1 border-white/40"
                      >
                  <div className="absolute h-[100px] w-[200px] bg-white/50 blur-[50px] -top-[80px] left-1/2 -translate-x-1/2"></div>
                  <div className="flex flex-1 gap-2 w-full text-white font-bold text-xl md:text-2xl px-4 items-center"><MessageCircle className="w-5 h-5 md:w-6 md:h-6"/>Real Time Chat</div>
                  <div className="w-full h-[310px] md:h-[350px] bg-white rounded-4xl shadow-[0_-10px_40px_rgb(252,252,252,.6)]">
                    <div className="h-full w-full px-3 py-4 flex flex-col gap-2">
                      <div className="bg-black text-sm md:text-md w-fit px-2 py-2 rounded-[8px] text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">Good morning</div>
                      <div className="bg-black text-sm md:text-md w-fit px-2 py-2 rounded-[8px] text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">Did you complete the task ?</div>
                      <div className="text-black text-xs md:text-sm text-shadow-2xs">12:30</div>
                      <div className="bg-white text-sm md:text-md w-fit px-2 py-2 rounded-[8px] text-black shadow-[0_3px_10px_rgb(0,0,0,0.2)] ml-auto">Morning, wokring on it.</div>
                      <div className="text-black text-xs md:text-sm ml-auto text-shadow-2xs">12:55</div>
                      <div className="bg-black text-sm md:text-md w-fit px-2 py-2 rounded-[8px] text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">let me know if you need help</div>
                      <div className="text-black text-xs md:text-sm text-shadow-2xs">12:56</div>
                      <div className="w-full h-[70px] md:h-[80px] rounded-2xl bg-[#D9D9D9] text-black/40 flex items-center px-3 justify-between text-sm md:text-base">Message..
                        <div className="w-[30px] md:w-[35px] h-[80%] bg-black rounded-full flex items-center justify-center"><SendHorizonal color="white" className="w-4 h-4 md:w-5 md:h-5"/></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
}

export const ClearnUi=()=>{
    return                   <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="mask-[linear-gradient(90deg,rgba(0,0,0,0)_0%,black)] w-[300px] md:w-[340px] h-[400px] md:h-[450px] bg-black rounded-4xl border-1 border-white/40"
                      >
                      <div className="relative w-full h-[85%] bg-white rounded-3xl  flex flex-col items-center justify-center gap-2 ">
                        <div className="absolute bg-[#FFC9C9] w-[45px] md:w-[50px] h-[35px] md:h-[40px] z-2 rounded-lg flex items-center justify-center text-red-700 text-base md:text-lg top-4 right-5"> live</div>
                      <div className=" bg-[#D9D9D9] relative h-[80%] w-[90%] rounded-tl-[12px] rounded-tr-none rounded-bl-[12px] rounded-br-[12px]  flex items-center justify-center ">
                          <div className=" cleanui absolute bg-white w-[55px] md:w-[60px] h-[45px] md:h-[50px] top-0 right-0 rounded-bl-[12px] "></div>
                          <img className="translate scale-80" src="UserIcon.png" alt="" />
                        </div>
                        <div className="w-full px-4 flex gap-2 justify-between">
                            <div className="flex gap-2">
                              <div className="bg-black size-[35px] md:size-[40px] rounded-lg flex items-center justify-center">
                                <User color="white" className="w-4 h-4 md:w-5 md:h-5"/>
                              </div>
                              <div className="font-bold text-sm md:text-base">@avi</div>
                            </div>
                            <div className="text-xs md:text-sm text-[#999999] pr-2">12m ago</div>
                        </div>
                      </div>
                      <div className="text-white w-full flex items-center justify-center pt-2 text-xl md:text-2xl">
                        Clean UI
                      </div>
                  </motion.div>
}