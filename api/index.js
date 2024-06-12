import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import s3UrlRouter from './routes/s3.route.js';
import session from 'express-session';
import passport from 'passport';
import multer from 'multer';

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
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/images', s3UrlRouter);

// const upload = multer({ dest: 'uploads/' });
// app.post("/api/images",upload.single("image"),(req, res) => {
//     console.log(req.body);
//     res.send("images uploaded successfully");
// })




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