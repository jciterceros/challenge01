const ICategorizer = require("../interfaces/ICategorizer");

class ProductCategorizer extends ICategorizer {
  constructor(titleNormalizer) {
    super();
    this.titleNormalizer = titleNormalizer;
  }

  categorize(products) {
    const categories = {};

    products.forEach((product) => {
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
