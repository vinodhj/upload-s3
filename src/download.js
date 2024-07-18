const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("./config");
const fs = require("fs");
const path = require("path");

async function downloadFileFromS3() {
  console.log("Downloading file from S3...");
  const downloadPath = path.join(
    __dirname,
    "../images/downloads",
    "1721306743131.png"
  );

  // Ensure the downloads directory exists
  if (!fs.existsSync(path.join(__dirname, "../images/downloads"))) {
    fs.mkdirSync(path.join(__dirname, "../images/downloads"));
  }
  try {
    const downloadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: "image/1721306743131.png",
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

downloadFileFromS3();
