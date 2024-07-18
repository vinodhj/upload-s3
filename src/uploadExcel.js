// uploadExcel.js
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const s3Client = require("./config");
const path = require("path");

async function uploadExcelToS3(filePath, key) {
  try {
    // Read the file contents
    const file_path = path.resolve(__dirname, filePath);
    const fileStream = fs.createReadStream(file_path);

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: fileStream,
      ContentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // MIME type for Excel files
    };

    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Excel file uploaded successfully:", data);
  } catch (err) {
    console.error("Error uploading Excel file:", err);
    throw err;
  }
}

uploadExcelToS3("../excel/aws_s3.csv", `excel/${Date.now()}.csv`);
