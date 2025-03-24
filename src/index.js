const path = require("path");
const JSONReader = require("./utils/JSONReader.js");
const createContainer = require("./config/container.js");
const logger = require("./config/logger.js");

const data01Path = path.join(__dirname, "../data01.json");

function validateData(data) {
  if (!Array.isArray(data) || data.some((product) => !product.title || !product.supermarket)) {
    throw new Error("Dados inválidos no arquivo JSON");
  }
}

function main() {
  try {
    const { productCategorizer } = createContainer();
    const dataReader = new JSONReader(data01Path);

    const data = dataReader.read();
    validateData(data);

    const categorizedProducts = productCategorizer.categorize(data);

    logger.info("Produtos categorizados com sucesso", {
      totalCategories: categorizedProducts.length,
    });

    console.log(JSON.stringify(categorizedProducts, null, 2));
  } catch (error) {
    throw new Error("Falha ao ler arquivo de dados");
  }
}

main();
