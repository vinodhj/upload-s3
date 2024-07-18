const axios = require("axios");
const { Upload } = require("@aws-sdk/lib-storage");
const s3Client = require("./config");
const path = require("path");

async function uploadFileFromUrlToS3(url, key) {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: response.data,
      },
    });

    upload.on("httpUploadProgress", (progress) => {
      console.log(`Uploaded ${progress.loaded} of ${progress.total} bytes`);
    });

    // Start the upload
    const data = await upload.done();
    console.log("File uploaded successfully:", data);
  } catch (err) {
    console.error("Error uploading file from URL:", err);
    throw err;
  }
}

uploadFileFromUrlToS3(
  "https://miro.medium.com/v2/resize:fit:1160/0*PQM2oxNUUceATC30",
  `image/${Date.now()}.png`
);
