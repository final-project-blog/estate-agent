import express from 'express';
import { google, googleCallback, signin, signOut } from '../controllers/auth.controller.js';

const router = express.Router();

//router.post("/signup",signup)
router.post("/signin", signin)
router.get("/google", google)
router.post("/signOut",signOut)
router.get("/google/callback", googleCallback)

export default router;