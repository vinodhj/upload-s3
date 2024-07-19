// jsonToCsv.js
const { parse } = require("json2csv");

const jsonToCsv = (json) => {
  try {
    const csv = parse(json);
    return csv;
  } catch (err) {
    console.error("Error converting JSON to CSV:", err);
    throw err;
  }
};

module.exports = jsonToCsv;
