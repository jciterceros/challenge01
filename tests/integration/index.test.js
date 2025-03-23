const JSONReader = require("../../src/utils/JSONReader.js");
const TitleNormalizer = require("../../src/services/TitleNormalizer.js");
const ProductCategorizer = require("../../src/services/ProductCategorizer.js");
const path = require("path");

describe("Testes de Integração para categorizeProducts", () => {
  const data01Path = path.join(__dirname, "../../data01.json");
  const data = new JSONReader(data01Path).read();

  let categorizeProducts;

  beforeEach(() => {
    const titleNormalizer = new TitleNormalizer();
    categorizeProducts = new ProductCategorizer(titleNormalizer);
  });

  describe("Arquivo JSON válido", () => {
    it("deve categorizar corretamente os produtos a partir de um arquivo JSON válido", () => {
      const result = categorizeProducts.categorize(data);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((category) => {
        expect(category).toHaveProperty("category");
        expect(category).toHaveProperty("products");
        expect(Array.isArray(category.products)).toBe(true);
      });
    });
  });

  describe("Erros de leitura de arquivo", () => {
    it("deve lançar um erro se o arquivo não for um JSON válido", () => {
      const invalidJSONPath = "../tests/../unit/invalid.json";

      // Cria um arquivo inválido temporariamente
      const fs = require("fs");
      const invalidContentPath = path.join(__dirname, invalidJSONPath);
      fs.writeFileSync(invalidContentPath, "conteúdo inválido");

      expect(() => {
        readJSONFile(invalidJSONPath);
      }).toThrow();

      // Remove o arquivo inválido após o teste
      fs.unlinkSync(invalidContentPath);
    });
  });
});
