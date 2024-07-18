// upload.js
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const s3Client = require("./config");

async function uploadFileToS3(filePath, key) {
  try {
    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: fileStream,
    };

    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("File uploaded successfully:", data);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
}

module.exports = uploadFileToS3;
