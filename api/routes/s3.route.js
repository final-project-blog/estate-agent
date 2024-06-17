import express from 'express';
import { downloadImage, uploadImage } from '../controllers/s3.controller.js';
import multer from 'multer';


const routes = express.Router();
const upload = multer({ dest: 'uploads/' });

routes.post('/upload',upload.single("image"), uploadImage);
routes.get('/download/:key', (req, res) => {
    const key = req.params.key;
    const readStream = downloadImage(key);
    return readStream.pipe(res);
});

export default routes;