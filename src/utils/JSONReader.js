const fs = require("fs");
const path = require("path");
const IDataReader = require("../interfaces/IDataReader");

class JSONReader extends IDataReader {
  constructor(filePath) {
    super();

    if (typeof filePath !== "string" || filePath.trim() === "") {
      throw new Error("O caminho do arquivo deve ser uma string válida.");
    }
    this.filePath = filePath;
  }

  read() {
    const absolutePath = path.isAbsolute(this.filePath) ? this.filePath : path.resolve(process.cwd(), this.filePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`O arquivo não foi encontrado: ${absolutePath}`);
    }

    const fileContent = fs.readFileSync(absolutePath, "utf-8");

    if (fileContent.trim() === "") {
      throw new Error("O arquivo está vazio.");
    }

    try {
      return JSON.parse(fileContent);
    } catch (error) {
      throw new Error("Erro ao analisar o arquivo JSON: " + error.message);
    }
  }
}

module.exports = JSONReader;
