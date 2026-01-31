"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useRecording, useRooom } from "../store"
import { AnimatePresence, motion } from "motion/react"
export function UploadingIndicator() {
    const filename = useRecording((state)=>state.filename)
        const uploadprogress = useRecording((state)=>state.recordingProgress);
        const isUploading = useRecording((state)=>state.isUploading);
        
  return  <AnimatePresence>
          {isUploading && 
            <motion.div className="absolute"
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
            }}>
                <Alert className="w-[300px] flex flex-col gap-2">
                  <AlertTitle>{filename}.mp4</AlertTitle>
                  <AlertDescription className="w-full h-full flex flex-col ">
                        <Progress value={uploadprogress} className="w-[100%]"/> 
                        <div className="flex justify-between">
                          <div>uploading...</div>
                          <div >{uploadprogress}%</div>
                        </div>
                  </AlertDescription>
                </Alert>
              </motion.div> 
            }
          </AnimatePresence>

  
}

