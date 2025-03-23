const assert = require("assert");
const ICategorizer = require("../../src/interfaces/ICategorizer");

describe("ICategorizer", () => {
  it("deve lançar um erro se categorize não for implementado", () => {
    const categorizer = new ICategorizer();
    assert.throws(() => {
      categorizer.categorize();
    }, /Método 'categorize' deve ser implementado/);
  });

  it("deve permitir que uma subclasse implemente o método categorize", () => {
    class CategorizerMock extends ICategorizer {
      categorize(products) {
        return products.filter((p) => p.startsWith("product"));
      }
    }

    const categorizer = new CategorizerMock();
    const products = ["product1", "item2", "product3"];
    assert.deepStrictEqual(categorizer.categorize(products), ["product1", "product3"]);
  });
});
