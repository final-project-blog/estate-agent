import dotenv from 'dotenv';
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

const downloadImage = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  };
  
  return s3.getObject(downloadParams).createReadStream()
}


export {uploadImage, downloadImage};
