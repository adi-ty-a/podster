import { AnimatePresence,motion } from "motion/react";
export const Premission=({permission,showPermissionBox}:{permission:(value:boolean)=>void,showPermissionBox:boolean})=>{

    return<AnimatePresence>
        {showPermissionBox &&
        < motion.div 
        initial={{
          y:-100,
          opacity:0
         }}
         animate={{
          y:0,
          opacity:100
         }}
         exit={{
          y:-100,
          opacity:0
         }}
         transition={{
          duration:.4
         }}
        className="z-2 absolute top-2 left-1/2 transform -translate-x-1/2 w-[250px] h-fit  border rounded-md bg-white border-black/30 flex px-4 py-3 items-center flex-col gap-4">
         Host wants to record the Podcast. Do you want to ?
         <div className="w-full flex justify-end gap-2">
         <button
          onClick={()=>permission(false)}
          className="bg-red-400 px-3 py-1 rounded-[3px]">no</button>
         <button 
         onClick={()=>permission(true)}
         className="bg-gray-300 px-3 py-1 rounded-[3px]">yes</button>
         </div>
        </motion.div>
        }
        </AnimatePresence>
        }