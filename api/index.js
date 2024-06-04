import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();

mongoose.connect(process.env.mongouri).then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.log(err);
});

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRouter);



app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ 
        success: false,
        statusCode,
        message,
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});