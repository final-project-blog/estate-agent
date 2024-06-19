import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import  verifyToken from '../utils/verifyToken.js';

import { deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', verifyToken, test);

router.put('/updateUser', verifyToken, updateUser);

router.delete('/delete/:id', verifyToken, deleteUser);

export default router;