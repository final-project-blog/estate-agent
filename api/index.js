import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

<<<<<<< HEAD
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });
  
=======
mongoose.connect(process.env.uri).then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.log(err);
});

>>>>>>> d6e8ac3 ( backend server with mongo connection)

const app = express();

app.listen(3000, () => {
<<<<<<< HEAD
    console.log('Server is running on port 3000');
    }
);
=======
  console.log('Server started on port 3000');
});
>>>>>>> d6e8ac3 ( backend server with mongo connection)
