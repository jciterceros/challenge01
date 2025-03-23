const path = require("path");
const readJSONFile = require("./utils/fileReader.js");
const categorizeProducts = require("./services/categorizeProducts.js");
const logger = require("./config/logger.js");

const data01Path = path.join(__dirname, "../data01.json");

let data01;
try {
  data01 = readJSONFile(data01Path);
} catch (error) {
  throw new Error("Falha ao ler arquivo de dados");
}

if (!Array.isArray(data01) || data01.some((product) => !product.title || !product.supermarket)) {
  throw new Error("Dados inválidos no arquivo JSON");
}

const categorizedProducts = categorizeProducts(data01);

logger.info("Produtos categorizados com sucesso", {
  totalCategories: categorizedProducts.length,
});

console.log(JSON.stringify(categorizedProducts, null, 2));
