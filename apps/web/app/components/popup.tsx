import { AnimatePresence } from "motion/react"
import { motion } from "motion/react"
export const Popup =({tittle,state}:{tittle:string,state?:boolean})=>{
    return  <AnimatePresence>
              {state && 
              <motion.div 
              initial={{
                y:100,
                opacity:0
              }}
              animate={{
                y:0,
                opacity:100
              }}
              exit={{
                y:100,
                opacity:0
              }}
              transition={{
                duration:.4
              }}
              className="-top-14 absolute bg-[#1F2224] h-fit w-fit pl-4 pr-8 py-4 text-white rounded-[12px] flex items-center">
                <div>{tittle}</div>
                <div className=" absolute right-2 size-[15px] rounded-full bg-red-400 animate-pulse"></div>
              </motion.div>}
            </AnimatePresence>
                

}