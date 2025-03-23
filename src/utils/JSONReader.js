const fs = require("fs");
const path = require("path");
const IDataReader = require("../interfaces/IDataReader");

class JSONReader extends IDataReader {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  read() {
    const absolutePath = path.isAbsolute(this.filePath) ? this.filePath : path.join(__dirname, this.filePath);
    const fileContent = fs.readFileSync(absolutePath, "utf-8");
    return JSON.parse(fileContent);
  }
}

module.exports = JSONReader;
