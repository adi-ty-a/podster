export const Recording = (strean:MediaStream):{
    startrecording:()=>void ,
    stopRecording:()=>Promise<{videoBlob:Blob,videoUrl:string}>
} =>{
    let recorder = new MediaRecorder(strean);
    const data = <Blob[]>([]); 
    const startrecording=()=>{
        console.log("started recording")
        if(recorder){
            recorder.ondataavailable = recordchunks
            recorder.start()
            }
        }

    const stopRecording = ()=>{
        console.log("stoped recording")
        return new Promise<{videoBlob:Blob,videoUrl:string}>((resolve)=>{
        recorder.stop()
        recorder.onstop = ()=>{
            const videoBlob = new Blob(data,{type:"video/webm"});
            const videoUrl =URL.createObjectURL(videoBlob);
            resolve({videoUrl,videoBlob})
            } 
        data.length = 0;
        })
    }

    const recordchunks = (e:BlobEvent)=>{
        data.push(e.data);
    }

    return {startrecording,stopRecording}
}