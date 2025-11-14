import fs, { read } from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chunksDir = path.join(__dirname, "../uploads/chunks");
const fulldir = path.join(__dirname, "../uploads/full");

export const mergeChunks=async(filename:string,totalChunks:number)=>{
    const writestream = fs.createWriteStream(path.join(fulldir,filename));
    console.log("merge part here")
    for(let i =0;i<totalChunks;i++){
        const chunkpath = path.join(chunksDir,`${filename}.part_${i}`)
        console.log(chunkpath);
        try{
            const readstream = fs.createReadStream(chunkpath)
            await new Promise<void>((resolve,reject)=>{
                readstream.pipe(writestream,{end:false});
                readstream.on("end",resolve);
                readstream.on("error",reject)
            })
            console.log(`Chunk ${i} merged successfully`);
            await fs.promises.unlink(chunkpath);
            console.log(`Chunk ${i} deleted successfully`);
            break; 
        }catch(e){
            console.log("error while merging")
            console.log(e)
        }
    }
    writestream.end();
    console.log('Chunks merged successfully');
}