"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useRecording, useRooom } from "../store"
import { AnimatePresence, motion } from "motion/react"
export function UploadingIndicator() {
    const filename = useRecording((state)=>state.filename)
        const uploadprogress = useRecording((state)=>state.recordingProgress);
        const {isUploading} = useRecording();
        
  return (
    <AnimatePresence>
      {isUploading && (
        <motion.div 
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm px-2"
          initial={{
            y: -100,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          exit={{
            y: -100,
            opacity: 0
          }}
          transition={{
            duration: 0.4
          }}
        >
          <Alert className="w-full flex flex-col gap-2 shadow-xl border-black/10 bg-white/95 backdrop-blur-sm">
            <AlertTitle className="truncate font-semibold">{filename}.mp4</AlertTitle>
            <AlertDescription className="w-full flex flex-col gap-1.5">
              <Progress value={uploadprogress} className="w-full h-2" /> 
              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                <span>Uploading...</span>
                <span>{uploadprogress}%</span>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div> 
      )}
    </AnimatePresence>
  );
}

