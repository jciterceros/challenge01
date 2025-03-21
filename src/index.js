const fs = require("fs");
const path = require("path");

const data01Path = path.join(__dirname, "../data01.json");
const data01 = JSON.parse(fs.readFileSync(data01Path, "utf-8"));

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, " ") // Remove espaços extras
    .split(" ")
    .sort()
    .join(" ");
}

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

const categorizedProducts = categorizeProducts(data01);
console.log(JSON.stringify(categorizedProducts, null, 2));
