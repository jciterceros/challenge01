const fs = require("fs");
const path = require("path");

function readJSONFile(filePath) {
  // Verifica se o caminho é absoluto, caso contrário, resolve com __dirname
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
  const fileContent = fs.readFileSync(absolutePath, "utf-8");
  return JSON.parse(fileContent);
}

module.exports = readJSONFile;
