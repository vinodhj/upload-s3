// index.js
const uploadFileToS3 = require("./upload");

const filePath = "./images/aws_s3.png";
const key = `image/${Date.now()}.png`;

async function main() {
  try {
    await uploadFileToS3(filePath, key);
  } catch (error) {
    console.error("Failed to upload file:", error);
  }
}

main();
