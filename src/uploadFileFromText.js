var { Readable } = require("stream");
const stream = require("stream");
const s3Client = require("./config");
const { Upload } = require("@aws-sdk/lib-storage");

const uploadStream = ({ bucket, fileKey }) => {
  const pass = new stream.PassThrough();
  return {
    writeStream: pass,
    promise: new Upload({
      client: s3Client,
      params: {
        Bucket: bucket,
        Key: fileKey,
        Body: pass,
      },
    }).done(),
  };
};

const generateReadable = (data) => {
  const redable = new Readable();
  redable._read = () => {};
  redable.push(data);
  redable.push(null);

  return redable;
};

const uploadFileFromText = async ({ bucket, fileKey, text }) => {
  const jsonReadable = generateReadable(text);
  console.log("Uploading file from text...");
  const { writeStream, promise } = uploadStream({
    bucket,
    fileKey,
  });
  jsonReadable.pipe(writeStream);
  const res = await promise;
  return res;
};

module.exports = uploadFileFromText;
