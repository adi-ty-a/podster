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
      className="ml-10 mt-6 rounded-xl border px-6 py-4 flex gap-4 min-w-[500px] w-full">
      <div className={`rounded-lg p-2 w-[50px] h-[50px] ${data.style} flex items-center justify-center`}>
        {variant=="create" ?<Video color="white"/> :<Plus color="black"/>}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-[18px]">{data.title}</p>
        <p className="text-[16px] text-black/80">{data.dis}</p>
      </div>
    </motion.div>
  );
};
