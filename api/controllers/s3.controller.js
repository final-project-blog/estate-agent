import dotenv from 'dotenv';
// import AWS from 'aws-sdk';
import {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import fs from 'fs-extra';
import util from 'util';
dotenv.config();

const region = process.env.AWS_BUCKET_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sessionToken = process.env.AWS_SESSION_TOKEN;
// const s3 = new AWS.S3({
//   accessKeyId,
//   secretAccessKey,
//   sessionToken,
//   region
// });

const s3Client = new S3Client({
  credentials: { accessKeyId, secretAccessKey, sessionToken },
  region
})

const unlinkFile = util.promisify(fs.unlink);

const uploadImage = async (req, res, next) => {
    const file = req.file;
    const filename = file.filename;
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: bucketName,
      Key: filename,
      Body: fileStream
    };
    await s3Client.send(new PutObjectCommand(uploadParams));
      // const imageInfo = await s3.upload(uploadParams).promise();
      // console.log(imageInfo.Location);
      // res.status(200).send({ imageUrl: imageInfo.Location });
      // console.log(imageInfo);
      res.status(200).send({ imageKey: filename });
      await unlinkFile(file.path);
      return filename; 
};

// const downloadImage = async (fileKey) => {
//   const downloadParams = {
//     Key: fileKey,
//     Bucket: bucketName
//   };
  
//   const data = await s3Client.send(new GetObjectCommand(downloadParams));
//   return data.Body;
// }

const getImageUrl = async (fileKey) => {
  const params = {
    Bucket: bucketName,
    Key: fileKey
  };

  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, command, { expiresIn: 360000 });
  return url;
}

const deleteImage = async (req, res, next) => {
  const fileKey = req.params.key;
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName
  };

  await s3Client.send(new DeleteObjectCommand(deleteParams));
  res.status(200).send('Image deleted successfully');
}

export {uploadImage, getImageUrl, deleteImage}
