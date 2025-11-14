import multer from "multer";
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chunksDir = path.join(__dirname, "../uploads/chunks");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, chunksDir);
  },
  filename: function (req, file, cb) {
    const basefilename = file.originalname.replace(/\s+/g,'');
    console.log(file)
    fs.readdir(chunksDir,(req,file)=>{
        const matchingfiles = file.filter((f)=>{f.startsWith(basefilename)});
        let chunkno = 0;
        if(matchingfiles.length > 0){
            const highestchunk = Math.max(...matchingfiles.map((f)=>{
                const match : RegExpMatchArray | null= f.match(/\.part_(\d+)$/);
                return match ? parseInt(match[1]!, 10) : -1;
            }))
            chunkno = highestchunk + 1
        }
        const filename  = `${basefilename}.part_${chunkno}`
        cb(null,filename);
    })
  }
})


export const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, 
})