const ICategorizer = require("../interfaces/ICategorizer");
const TitleNormalizer = require("./TitleNormalizer");

class ProductCategorizer extends ICategorizer {
  constructor(titleNormalizer) {
    super();
    if (!titleNormalizer || typeof titleNormalizer.normalize !== "function") {
      throw new Error("titleNormalizer deve implementar o método 'normalize'.");
    }
    this.titleNormalizer = new TitleNormalizer();
  }

  categorize(products) {
    if (!Array.isArray(products)) {
      throw new Error("A entrada deve ser um array de produtos.");
    }

    const categories = {};

    products.forEach((product) => {
      if (!product.title || !product.supermarket) {
        throw new Error("Cada produto deve ter um título e um supermercado.");
      }

      const normalizedTitle = this.titleNormalizer.normalize(product.title);
      if (!categories[normalizedTitle]) {
        categories[normalizedTitle] = {
          category: product.title,
          count: 0,
          products: [],
        };
      }
      categories[normalizedTitle].count += 1;
      categories[normalizedTitle].products.push({
        title: product.title,
        supermarket: product.supermarket,
      });
    });

    return Object.values(categories);
  }
}

module.exports = ProductCategorizer;
