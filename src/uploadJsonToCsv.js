const path = require("path");
const fs = require("fs");
var uploadFileFromText = require("./uploadFileFromText");
const jsonToCsv = require("./jsonToCsv"); // Import the JSON to CSV helper

async function uploadJsonToCsv(filePath, key) {
  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(jsonData); // Parse JSON data
    const csvData = jsonToCsv(json); // Convert JSON to CSV

    const data = await uploadFileFromText({
      bucket: process.env.S3_BUCKET_NAME,
      fileKey: key,
      text: csvData,
    });
    console.log("File uploaded successfully:", data);

    
  } catch (err) {
    console.error("Error uploading Excel file:", err);
    throw err;
  }
}

uploadJsonToCsv("./package.json", `json2csv-stream-${Date.now()}.csv`);
