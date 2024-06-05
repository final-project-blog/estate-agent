import express from 'express';
import createListing from '../controllers/listing.controller.js';
import verifyToken from '../utills/verifyToken.js';

const routes = express.Router();

routes.post('/create', verifyToken, createListing );

export default routes;