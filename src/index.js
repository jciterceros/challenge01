const path = require("path");
const readJSONFile = require("./utils/fileReader.js");
const categorizeProducts = require("./services/categorizeProducts.js");
const logger = require("./config/logger.js");

const data01Path = path.join(__dirname, "../data01.json");
const data01 = readJSONFile(data01Path);

const categorizedProducts = categorizeProducts(data01);

logger.info("Produtos categorizados com sucesso", {
  totalCategories: categorizedProducts.length,
});

console.log(JSON.stringify(categorizedProducts, null, 2));
