"use client"
import { Video } from "lucide-react";
import { Plus } from "lucide-react";
import { animate, motion } from "motion/react"
// const vairants={
//     create:{
//         title:"Start New Call",
//         dis:"Create a video room",
//         style:"bg-black"
//     },
//     join:{
//         title:"Join Call",
//         dis:"Enter a room",
//         style:"border bg-[#FAFAFA]"
//     }
// }
// export const Quickactions = ({variant,}: {variant: keyof typeof vairants}) => {
//   const data = vairants[variant];

//   return (
//     <motion.div 
//       whileHover={{
//         scale:1.1,
//         transition: { duration: 0.1 }
//       }}
//       transition={{duration:.5}}
//       className="ml-10 mt-6 rounded-xl md:border md:px-12 md:py-4 py-2 flex gap-4 md:max-w-[500px] md:w-full md:flex-row flex-col md:items-start items-center">
//       <div className={`rounded-lg p-2  md:size-[50px] size-[60px] ${data.style} flex items-center justify-center`}>
//         {variant=="create" ?<Video color="white"/> :<Plus color="black"/>}
//       </div>
//       <div className="md:flex flex-col hidden ">
//         <p className="font-semibold md:text-[18px] text-[14px]">{data.title}</p>
//         <p className="md:text-[16px] text-[12px] text-black/80">{data.dis}</p>
//       </div>
//     </motion.div>
//   );
// };

export const Quickactions = () => {
  return (
    <div className="bg-[#FF5353] rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 md:p-7 flex flex-col justify-between items-start w-full h-[250px] sm:h-[280px] md:h-[300px] text-white cursor-pointer select-none transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99]">
      <div className="w-full flex flex-col items-start gap-1">
        <div className="text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">PODCAST</div>
        <div className="text-white/95 flex flex-col text-xs sm:text-sm font-semibold leading-snug">
          <span>Start a room by giving a</span>
          <span>Name</span>
        </div>
      </div>
      <div className="flex w-full items-center justify-center my-auto pt-2">
        <div className="size-[84px] sm:size-[96px] md:size-[110px] bg-white rounded-full flex items-center justify-center shadow-md">
          <svg className="w-[50%] h-[50%]" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.3334 15.8333C25.3334 8.83771 31.0044 3.16666 38 3.16666C44.9955 3.16666 50.6667 8.83771 50.6667 15.8333V38C50.6667 44.9955 44.9955 50.6667 38 50.6667C31.0044 50.6667 25.3334 44.9955 25.3334 38V15.8333Z" fill="#FF5B5B"/>
            <path d="M19.7917 37.5054V38C19.7917 42.8292 21.71 47.4604 25.1248 50.8753C28.5395 54.29 33.1708 56.2083 38 56.2083C42.8292 56.2083 47.4604 54.29 50.8754 50.8753C54.29 47.4604 56.2083 42.8292 56.2083 38V37.5054C56.2083 35.7564 57.6261 34.3387 59.375 34.3387H60.9583C62.7073 34.3387 64.125 35.7564 64.125 37.505V38C64.125 44.9287 61.3725 51.5739 56.4731 56.473C52.5166 60.4298 47.4218 62.9859 41.9583 63.8235V69.6667C41.9583 71.4156 40.5406 72.8333 38.7917 72.8333H37.2083C35.4594 72.8333 34.0417 71.4156 34.0417 69.6667V63.8235C28.5782 62.9859 23.4833 60.4298 19.5268 56.473C14.6274 51.5739 11.875 44.9287 11.875 38V37.5054C11.875 35.7564 13.2928 34.3387 15.0417 34.3387H16.625C18.3739 34.3387 19.7917 35.7564 19.7917 37.5054Z" fill="#FF5B5B"/>
          </svg>
        </div>
      </div>
    </div>
  );
}