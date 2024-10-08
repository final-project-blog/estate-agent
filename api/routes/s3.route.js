import express from 'express';
import { getImageUrl, uploadImage, deleteImage } from '../controllers/s3.controller.js';
import multer from 'multer';


const routes = express.Router();
const upload = multer({ dest: 'uploads/' });

routes.post('/upload',upload.single("image"), uploadImage);
// routes.get('/download/:key', (req, res) => {
//     const key = req.params.key;
//     const readStream = downloadImage(key);
//     return readStream
// });

routes.get('/Url/:key', async (req, res) => {
    const filekey = req.params.key;
    const imageUrl = await getImageUrl(filekey);
    res.status(200).send({imageUrl: imageUrl});
    return imageUrl
});

routes.delete('/delete/:key', deleteImage);

export default routes;