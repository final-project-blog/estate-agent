import express from 'express';

const router = express.Router();

// Define your S3 URL routes here
router.get('/', (req, res) => {
  res.send('S3 URL route is working!');
});

export default router;
