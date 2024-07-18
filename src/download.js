const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("./config");
const fs = require("fs");
const path = require("path");

async function downloadFileFromS3(download_path, key_folder, key) {
  console.log("Downloading file from S3...");
  const downloadPath = path.join(__dirname, download_path, key);

  // Ensure the downloads directory exists
  if (!fs.existsSync(path.join(__dirname, download_path))) {
    fs.mkdirSync(path.join(__dirname, download_path));
  }
  try {
    const downloadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${key_folder}/${key}`,
    };
    const data = await s3Client.send(new GetObjectCommand(downloadParams));
    const fileStream = fs.createWriteStream(downloadPath);
    data.Body.pipe(fileStream);
    fileStream.on("close", () => {
      console.log("File downloaded successfully:", downloadPath);
    });
  } catch (err) {
    console.error("Error downloading file:", err);
  }
}

// Image
//downloadFileFromS3("../images/downloads", "image", "aws_s3.png");

// Excel
//downloadFileFromS3("../excel/downloads", "excel", "aws_s3.csv");
