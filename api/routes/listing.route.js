import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import verifyToken from '../utils/verifyToken.js';

const routes = express.Router();

routes.post('/create', verifyToken, createListing );
routes.delete('/delete/:id', verifyToken, deleteListing);
routes.post('/update', verifyToken, updateListing);
routes.get('/get/:id', getListing);
routes.get('/get', getListings);

export default routes;