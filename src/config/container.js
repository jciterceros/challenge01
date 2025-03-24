const TitleNormalizer = require("../services/TitleNormalizer");
const ProductCategorizer = require("../services/ProductCategorizer");

function createContainer() {
  const titleNormalizer = new TitleNormalizer();
  const productCategorizer = new ProductCategorizer(titleNormalizer);

  return {
    titleNormalizer,
    productCategorizer,
  };
}

module.exports = createContainer;
