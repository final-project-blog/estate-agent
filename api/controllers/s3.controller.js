import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import fs from 'fs-extra';
import util from 'util';
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

const unlinkFile = util.promisify(fs.unlink);

const uploadImage = async (req, res, next) => {
    const file = req.file;
    // console.log(file);
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: bucketName,
      Key: file.filename,
      Body: fileStream
    };
      const imageInfo = await s3.upload(uploadParams).promise();
      // console.log(imageInfo.Location);
      // res.status(200).send({ imageUrl: imageInfo.Location });
      // console.log(imageInfo);
      res.status(200).send({ imageKey: imageInfo.Key });
      await unlinkFile(file.path);
      return imageInfo.Key; 
};

const downloadImage = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  };
  
  return s3.getObject(downloadParams).createReadStream()
}


export {uploadImage, downloadImage};