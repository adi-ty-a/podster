"use client"
import { motion ,type Variants} from "motion/react"

export default function FeatureSection() {
    const cn = (...classes: string[]) => classes.join(" ");

    const container :Variants= {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const item :Variants= {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return <div className="bg-[#F0F3F5] w-screen h-screen flex flex-col items-center justify-center py-14 sm:py-[70px] px-4">
        <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-center bg-gradient-to-b from-black to-[#999999] bg-clip-text text-transparent [text-shadow:0px_3px_2.3px_rgba(0,0,0,0.09)]"
        >
            How Podster works
        </motion.div>

        <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col md:flex-row w-full max-w-[1000px] items-center md:items-stretch gap-16 md:gap-10 mt-16 sm:mt-20 md:mt-[100px]"
        >
            {/* box 1 */}
            <motion.div variants={item} className="relative w-full max-w-[300px] aspect-square bg-white rounded-[42px] flex items-center justify-center shrink-0">
                <div className="absolute text-[32px] sm:text-[42px] bg-gradient-to-b from-[#D04343] to-[#EC8787] text-white size-fit px-5 py-0 -top-7 sm:-top-8 left-1/2 rounded-full -translate-x-1/2">1</div>
                <div className="flex flex-col justify-between h-full">
                    <div className="relative w-full h-[70%] flex items-center justify-center ">
                        <div className="absolute w-[270px] h-full top-5 flex items-center justify-center "
                            style={{
                                maskImage: "radial-gradient(ellipse 90% 60% at center, black 40%, transparent 65%)"
                            }}
                        >
                            <div className="w-52 h-52 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0)_60%,_rgba(255,255,255,0.3)_20%,_rgba(255,0,0,1)_100%)] flex items-center justify-center [transform:rotateZ(-6deg)_rotatey(30deg)_rotatex(30deg)] scale-130 ">
                                <div className="w-38 h-38 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0)_60%,_rgba(255,255,255,0.3)_20%,_rgba(255,0,0,1)_100%)] flex items-center justify-center">
                                    <div className="bg-gradient-to-b from-[#F9CDCD] to-[#EA2B2B] text-white px-6 py-2 rounded-2xl text-[16px] size-fit">Create</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-[30%] w-full px-[24px] gap-[2px] pt-[5px]">
                        <div className="text-[#351111] text-[18px] font-semibold">Create a room</div>
                        <div className="text-[#6D6D6D] text-[14px] w-full font-medium leading-4">Spin up a recording room and share the link with your guests</div>
                    </div>
                </div>
            </motion.div>

            {/* box 2 */}
            <motion.div variants={item} className="relative w-full max-w-[300px] aspect-square bg-white rounded-[42px] flex items-center justify-center shrink-0">
                <div className="absolute text-[32px] sm:text-[42px] bg-gradient-to-b from-[#D04343] to-[#EC8787] text-white size-fit px-5 py-0 -top-7 sm:-top-8 left-1/2 rounded-full -translate-x-1/2">2</div>
                <div className="flex flex-col justify-between h-full">
                    <div className="w-full h-[70%] flex px-[24px] pt-[32px] items-center justify-center">
                        <div className="relative size-full flex items-center justify-center ">
                            <div className="absolute top-4 left-1/2 z-2 -translate-x-6 size-[50px] rounded-[8px] z-1 bg-linear-to-b from-[#FF9696] to-[#fae6e6] flex items-center justify-center">
                                <svg fill="#ffffff" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M491.584,192.576l-55.918-6.914c-0.919-2.351-1.884-4.681-2.892-6.991l34.648-44.429 c7.227-9.266,6.412-22.464-1.901-30.773l-57.028-56.996c-8.31-8.304-21.501-9.114-30.762-1.891l-44.414,34.633 c-2.31-1.01-4.642-1.975-6.994-2.895l-6.915-55.903C317.966,8.755,308.061,0,296.311,0h-80.635 c-11.748,0-21.655,8.758-23.097,20.416l-6.912,55.904c-2.351,0.92-4.682,1.884-6.988,2.892l-44.417-34.641 c-9.266-7.225-22.46-6.414-30.768,1.893l-57.021,57.009c-8.308,8.307-9.123,21.506-1.896,30.771l34.644,44.417 c-1.01,2.312-1.977,4.647-2.898,7.002l-55.906,6.915C8.757,194.02,0,203.925,0,215.675v80.64c0,11.751,8.758,21.658,20.421,23.099 l55.9,6.901c0.92,2.354,1.885,4.686,2.894,6.994l-34.639,44.42c-7.224,9.264-6.412,22.46,1.894,30.766l57.021,57.031 c8.307,8.308,21.507,9.123,30.771,1.896l44.418-34.648c2.306,1.007,4.636,1.972,6.985,2.889l6.914,55.921 C194.02,503.245,203.926,512,215.676,512h80.637c11.748,0,21.654-8.755,23.097-20.415l6.915-55.921 c2.352-0.919,4.684-1.884,6.993-2.892l44.424,34.65c9.269,7.227,22.463,6.412,30.773-1.897l57.015-57.031 c8.305-8.307,9.117-21.504,1.891-30.767l-34.639-44.409c1.01-2.313,1.977-4.648,2.897-7.004l55.9-6.903 C503.242,317.971,512,308.066,512,296.313v-80.64C512,203.925,503.243,194.019,491.584,192.576z M255.997,310.301 c-29.941,0-54.3-24.354-54.3-54.294c0-29.946,24.359-54.309,54.3-54.309c29.944,0,54.306,24.363,54.306,54.309 C310.303,285.947,285.941,310.301,255.997,310.301z"></path> </g> </g> </g></svg>
                            </div>
                            <svg className="scale-70 -z-0" width="186" height="114" viewBox="0 0 186 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 114.006V58.0057L63.1411 56.7281H96.1411M185.5 114.006V58.0057L134.01 56.7281H96.1411M96.1411 56.7281L95.5 0.00561523" stroke="#FF3838" strokeDasharray="10 10" />
                            </svg>
                            <img src="/lama.png" className="absolute right-9 bottom-3 rounded-full size-[50px] mask-b-from-10% mask-b-to-100%"/>
                            <img src="/horse.png" className="absolute left-9 bottom-3 rounded-full size-[50px] mask-b-from-10% mask-b-to-100%"/>
                        </div>
                    </div>
                    <div className="flex flex-col h-[30%] w-full px-[24px] gap-[2px] pt-[5px]">
                        <div className="text-[#351111] text-[18px] font-semibold">Record Locally</div>
                        <div className="text-[#6D6D6D] text-[14px] w-full font-medium leading-4">Each participant records in studio quality straight from their browser</div>
                    </div>
                </div>
            </motion.div>

            {/* box 3 */}
            <motion.div variants={item} className="relative w-full max-w-[300px] aspect-square bg-white rounded-[42px] flex items-center justify-center shrink-0">
                <div className="absolute text-[32px] sm:text-[42px] bg-gradient-to-b from-[#D04343] to-[#EC8787] text-white size-fit px-5 py-0 -top-7 sm:-top-8 left-1/2 rounded-full -translate-x-1/2">3</div>
                <div className="flex flex-col justify-between h-full">
                    <div className="w-full h-[70%] flex px-[24px] pt-[32px] items-center justify-center scale-85 ">
                        <div className="relative size-full flex flex-col items-end ">
                            <img src="/circle.svg" className="absolute left-[70px] top-[30px] z-3" />
                            <img src="/arrosofcircle.svg" className="absolute left-[65px] top-[25px] z-4" />
                            <img src="/file.svg" className="absolute left-[100px] scale-80 z-5" />
                            <img src="/wave.svg" className="absolute bottom-0 scale-140 translate-y-20" />
                            <div className="absolute left-[100px] bottom-12 size-[60px] rounded-[12px] bg-[#FFF0F0] z-6 shadow-[0px_1px_4px_rgba(0,0,0,0.15),inset_0px_-16px_9.3px_rgba(255,255,255,0.25),inset_0px_5px_4px_rgba(255,255,255,0.25)] ">
                                <svg className="scale-65" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z" fill="#FF4A4A"></path> </g></svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-[30%] w-full px-[24px] gap-[2px] pt-[5px]">
                        <div className="text-[#351111] text-[18px] font-semibold">Export and Share</div>
                        <div className="text-[#6D6D6D] text-[14px] w-full font-medium leading-4">Download synced audio and video, ready for your editor or feed</div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    </div>
}