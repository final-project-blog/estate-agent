import express from 'express';
import { uploadImage } from '../controllers/s3.controller.js';
import multer from 'multer';


const routes = express.Router();
const upload = multer({ dest: 'uploads/' });
// routes.get('/s3Url', generateUploadURL );
routes.post('/upload',upload.single("image"), uploadImage);

export default routes;