import express from 'express';
import { verifyToken } from '../utills/verifyUser';
import { createListing } from '../controllers/listing.controller';

const routes = express.Router();

routes.post('/create', verifyToken, createListing );

export default routes;