const assert = require("assert");
const ICategorizer = require("../../../src/interfaces/ICategorizer");

describe("ICategorizer", () => {
  it("deve lançar um erro se categorize não for implementado", () => {
    class CategorizerMock extends ICategorizer {}
    const categorizer = new CategorizerMock();
    assert.throws(() => {
      categorizer.categorize();
    }, /Método 'categorize' deve ser implementado/);
  });

  it("não deve permitir instanciar ICategorizer diretamente", () => {
    assert.throws(() => {
      new ICategorizer();
    }, /Método 'categorize' deve ser implementado/);
  });

  it("deve permitir que uma subclasse seja instanciada sem lançar erro", () => {
    class CategorizerMock extends ICategorizer {
      categorize(products) {
        return products;
      }
    }
    assert.doesNotThrow(() => {
      new CategorizerMock();
    });
  });

  it("deve garantir que categorize seja chamado com os argumentos corretos", () => {
    class CategorizerMock extends ICategorizer {
      categorize(products) {
        return products.filter((p) => p.includes("valid"));
      }
    }
    const categorizer = new CategorizerMock();
    const products = ["valid1", "valid"];
    assert.deepStrictEqual(categorizer.categorize(products), ["valid1", "valid"]);
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
