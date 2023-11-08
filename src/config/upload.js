import multer from "multer";
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export default {
    storage: multer.diskStorage({
        destination:path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'thumbnails'),
        filename:(request, file, callback)=>{
            const ext = path.extname(file.originalname);     //EXTRAI A EXTENÇÃO DO ARQUIVO
            const name = path.basename(file.originalname, ext); // EXTRAI O NOME DO ARQUIVO
            callback(null, `${name}-${Date.now()}${ext}`)
        },
    })
}