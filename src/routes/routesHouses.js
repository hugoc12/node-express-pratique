import express, { Router } from 'express';

import ControllerHouses from '../controller/ControllerHouses.js';

import multer from "multer";
import path from 'node:path';
import { fileURLToPath } from 'url';

const uploadThumbnail = multer({ //Middleware para receber arquivos.
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './src/thumbnails')
        },
        filename: (req, file, callback) => {
            let ext = path.extname(file.originalname);
            let name = path.basename(file.originalname, ext);
            
            callback(null, `${name}-${Date.now()}${ext}`)
        }
    })
})

const routerHouses = new Router();


routerHouses.route('/houses')
    .get(ControllerHouses.index)
    .post(uploadThumbnail.single('thumbnail'), ControllerHouses.store)

routerHouses.route('/house/:id')
    .get(ControllerHouses.indexId)
    .delete(ControllerHouses.delete)
    .put(uploadThumbnail.single('thumbnail'), ControllerHouses.updateId)

export default routerHouses;