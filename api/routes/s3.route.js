import express from 'express';
import { getImageUrl, uploadImage } from '../controllers/s3.controller.js';
import multer from 'multer';


const routes = express.Router();
const upload = multer({ dest: 'uploads/' });

routes.post('/upload',upload.single("image"), uploadImage);
// routes.get('/download/:key', (req, res) => {
//     const key = req.params.key;
//     const readStream = downloadImage(key);
//     return readStream
// });

routes.get('/Url/:key', (req, res) => {
    const key = req.params.key;
    const imageUrl = getImageUrl(key);
    return imageUrl
});

export default routes;