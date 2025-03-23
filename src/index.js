const path = require("path");
const JSONReader = require("./utils/JSONReader.js");
const TitleNormalizer = require("./services/TitleNormalizer.js");
const ProductCategorizer = require("./services/ProductCategorizer.js");
const logger = require("./config/logger.js");

const data01Path = path.join(__dirname, "../data01.json");

function validateData(data) {
  if (!Array.isArray(data) || data.some((product) => !product.title || !product.supermarket)) {
    throw new Error("Dados inválidos no arquivo JSON");
  }
}

function main() {
  try {
    const dataReader = new JSONReader(data01Path);
    const titleNormalizer = new TitleNormalizer();
    const productCategorizer = new ProductCategorizer(titleNormalizer);

    const data = dataReader.read();
    validateData(data);

    const categorizedProducts = productCategorizer.categorize(data);

    logger.info("Produtos categorizados com sucesso", {
      totalCategories: categorizedProducts.length,
    });

    console.log(JSON.stringify(categorizedProducts, null, 2));
  } catch (error) {
    logger.error("Falha ao ler arquivo de dados", { error: error.message });
    process.exit(1);
  }
}

main();
