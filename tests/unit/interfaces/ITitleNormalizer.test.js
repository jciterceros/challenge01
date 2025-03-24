const assert = require("assert");
const ITitleNormalizer = require("../../../src/interfaces/ITitleNormalizer");

describe("ITitleNormalizer", () => {
  it("deve lançar um erro se normalize não for implementado", () => {
    const normalizer = new ITitleNormalizer();
    assert.throws(() => {
      normalizer.normalize();
    }, /Método 'normalize' deve ser implementado/);
  });

  it("deve permitir que uma subclasse implemente o método normalize", () => {
    class TitleNormalizerMock extends ITitleNormalizer {
      normalize(title) {
        return title.trim().toLowerCase();
      }
    }

    const normalizer = new TitleNormalizerMock();
    const title = "  Example Title  ";
    assert.strictEqual(normalizer.normalize(title), "example title");
  });
});
