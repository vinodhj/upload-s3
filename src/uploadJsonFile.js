var uploadFileFromText = require("./uploadFileFromText");

async function uploadJsonFileToS3() {
  try {
    const data = await uploadFileFromText({
      bucket: process.env.S3_BUCKET_NAME,
      fileKey: "text.json",
      text: JSON.stringify({ name: "dizzy", role: "admin" }, null, 2),
    });
    console.log("File uploaded successfully:", data);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
}

uploadJsonFileToS3();
