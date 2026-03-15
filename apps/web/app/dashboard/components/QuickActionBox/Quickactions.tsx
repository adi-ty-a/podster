"use client"
import { Video } from "lucide-react";
import { Plus } from "lucide-react";
import { animate, motion } from "motion/react"
const vairants={
    create:{
        title:"Start New Call",
        dis:"Create a video room",
        style:"bg-black"
    },
    join:{
        title:"Join Call",
        dis:"Enter a room",
        style:"border bg-[#FAFAFA]"
    }
}
export const Quickactions = ({variant,}: {variant: keyof typeof vairants}) => {
  const data = vairants[variant];

  return (
    <motion.div 
      whileHover={{
        scale:1.1,
        transition: { duration: 0.1 }
      }}
      transition={{duration:.5}}
      className="ml-10 mt-6 rounded-xl md:border md:px-12 md:py-4 py-2 flex gap-4 md:max-w-[500px] md:w-full md:flex-row flex-col md:items-start items-center">
      <div className={`rounded-lg p-2  md:size-[50px] size-[60px] ${data.style} flex items-center justify-center`}>
        {variant=="create" ?<Video color="white"/> :<Plus color="black"/>}
      </div>
      <div className="md:flex flex-col hidden ">
        <p className="font-semibold md:text-[18px] text-[14px]">{data.title}</p>
        <p className="md:text-[16px] text-[12px] text-black/80">{data.dis}</p>
      </div>
    </motion.div>
  );
};
