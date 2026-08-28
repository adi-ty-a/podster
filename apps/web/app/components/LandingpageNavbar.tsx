"use client"
import { useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import JoinPodcastBtn from "../home/buttoncomponet";
import { AnimatePresence, motion } from "motion/react";
export default function LandingNav({children,  menuboxclose, state}: { children:ReactNode[] | ReactNode, menuboxclose: Dispatch<SetStateAction<boolean>>, state?: boolean | false}) {

    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3, delay: 0.15 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.1 }
        }
    };

    return <motion.div
        animate={{
            width: state ? "380px" : "100%",
            borderRadius: state ? "32px" : 0,
            height: state ? "48px" : "64px",
            marginTop: state ? 10 : 0,
            top: state ? 10 : 0,
            opacity: state ? .7 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 flex justify-center bg-white/90 backdrop-blur-lg z-20 h-[64px] w-full ">
        <div className="relative flex w-[80%] max-w-[1200px] justify-between items-center md:px-6 py-4 border-black/20">
            <AnimatePresence>
                {!state && <motion.div
                    key="logo"
                    variants={fadeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center justify-between gap-[20px]">
                    <div className="relative  size-[36px] rounded-[14px] overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                        <div className="absolute -top-6  blur-[18px] w-[82px] h-[21px] bg-white z-1 flex " />
                        <img
                            src="logoimg.jpg"
                            alt="logo"
                            className="absolute w-[60px] h-[60px] object-cover -top-[12px] "
                        />
                    </div>
                    <div className="text-black text-2xl font-bold">Podster</div>
                </motion.div>}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:flex justify-center gap-10 w-[460px] items-center hidden h-[32px] ">
                    {/* <div className="cursor-pointer text-[14px] text-[#898989] font-semibold" onClick={scrolltotop}>Home</div>
                    <div className="cursor-pointer text-[14px] text-[#898989] font-semibold" onClick={scollview}>Product</div> */}
                    {children}
                    <div className="cursor-pointer text-[14px] text-[#898989] font-semibold">About</div>
                </div>
                {!state && <motion.div
                    key="button"
                    variants={fadeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                    <JoinPodcastBtn />
                </motion.div>}
            </AnimatePresence>
        </div>
    </motion.div>

}