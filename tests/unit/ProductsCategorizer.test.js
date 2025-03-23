const TitleNormalizer = require("../../src/services/TitleNormalizer.js");
const ProductCategorizer = require("../../src/services/ProductCategorizer.js");

describe("categorizeProducts", () => {
  let categorizeProducts;

  beforeEach(() => {
    const titleNormalizer = new TitleNormalizer();
    categorizeProducts = new ProductCategorizer(titleNormalizer);
  });

  it("deve categorizar produtos pelo título normalizado", () => {
    const products = [
      { title: "Leite Integral Piracanjuba 1L", supermarket: "Supermercado A" },
      { title: "Leite Piracanjuba Integral 1L", supermarket: "Supermercado B" },
      { title: "Leite Integral Italac 1L", supermarket: "Supermercado A" },
    ];

    const result = categorizeProducts.categorize(products);

    expect(result).toEqual([
      {
        category: "Leite Integral Piracanjuba 1L",
        count: 2,
        products: [
          { title: "Leite Integral Piracanjuba 1L", supermarket: "Supermercado A" },
          { title: "Leite Piracanjuba Integral 1L", supermarket: "Supermercado B" },
        ],
      },
      {
        category: "Leite Integral Italac 1L",
        count: 1,
        products: [{ title: "Leite Integral Italac 1L", supermarket: "Supermercado A" }],
      },
    ]);
  });

  it("deve lidar com uma lista de produtos vazia", () => {
    const products = [];

    const result = categorizeProducts.categorize(products);

    expect(result).toEqual([]);
  });

  it("deve lidar com produtos com caracteres especiais e espaços extras", () => {
    const products = [
      { title: "Arroz Branco Tio João 5kg", supermarket: "Supermercado A" },
      { title: "Arroz Tio João Branco 5kg", supermarket: "Supermercado B" },
    ];

    const result = categorizeProducts.categorize(products);

    expect(result).toEqual([
      {
        category: "Arroz Branco Tio João 5kg",
        count: 2,
        products: [
          { title: "Arroz Branco Tio João 5kg", supermarket: "Supermercado A" },
          { title: "Arroz Tio João Branco 5kg", supermarket: "Supermercado B" },
        ],
      },
    ]);
  });

  it("deve lidar com produtos com o mesmo título, mas de supermercados diferentes", () => {
    const products = [
      { title: "Feijão Carioca Camil 1kg", supermarket: "Supermercado A" },
      { title: "Feijão Carioca Camil 1kg", supermarket: "Supermercado C" },
    ];

    const result = categorizeProducts.categorize(products);

    expect(result).toEqual([
      {
        category: "Feijão Carioca Camil 1kg",
        count: 2,
        products: [
          { title: "Feijão Carioca Camil 1kg", supermarket: "Supermercado A" },
          { title: "Feijão Carioca Camil 1kg", supermarket: "Supermercado C" },
        ],
      },
    ]);
  });
});
