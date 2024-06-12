import dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
import fs from 'fs-extra';
dotenv.config();

const region = process.env.AWS_BUCKET_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sessionToken = process.env.AWS_SESSION_TOKEN;
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  sessionToken,
  region
});

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
    sessionToken
  },
  signatureVersion: 'v4'
});
const uploadImage = async (req, res, next) => {
    const file = req.file;
    console.log(file);
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: bucketName,
      Key: file.filename,
      Body: fileStream
    };
      const imageInfo = await s3.upload(uploadParams).promise();
      console.log(imageInfo.Location);
      res.status(200).send({ imageUrl: imageInfo.Location });
      return imageInfo.Location; 
};


export {uploadImage};

// const imageFile = req.file;
  // console.log(imageFile);
  // const params = {
  //   Bucket: bucketName,
  //   Key: imageFile.originalname,
  //   Body: imageFile.buffer
  // };

  // // Upload file to S3
  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     console.error('Error uploading image to S3:', err);
  //     return res.status(500).send('Error uploading image to S3');
  //   }
  //   console.log('Image uploaded to S3:', data.Location);
  //   res.status(200).send('Image uploaded successfully');
  // });
// };

// const rawBytes = await randomBytes(16);
//   const imageName = rawBytes.toString('hex');

//   const params = {
//     Bucket: bucketName,
//     Key: imageName,
//     Expires: 60
//   };

//   try {
//     const command = new PutObjectCommand(params);
//     const { href: uploadURL } = await s3Client.presign(command);
//     // res.json({ uploadURL });
//     console.log(uploadURL);
//     return uploadURL;
//   } catch (error) {
//     console.error('Error generating upload URL:', error);
//   }