const fs = require("fs");
const path = require("path");

function readJSONFile(relativePath) {
  const filePath = path.join(__dirname, relativePath);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}

module.exports = readJSONFile;
