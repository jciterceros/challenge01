const normalizeTitle = require("./normalizeTitle.js");

function categorizeProducts(products) {
  const categories = {};

  products.forEach((product) => {
    const normalizedTitle = normalizeTitle(product.title);
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

module.exports = categorizeProducts;
