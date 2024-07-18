// config.js
const { S3Client } = require("@aws-sdk/client-s3");
const { fromSSO } = require("@aws-sdk/credential-providers");
const dotenv = require("dotenv");

dotenv.config();

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: fromSSO({ profile: process.env.AWS_PROFILE }),
});

module.exports = s3Client;
