const path = require("path");
const readJSONFile = require("../../src/utils/fileReader.js");
const categorizeProducts = require("../../src/services/categorizeProducts.js");

describe("Testes de Integração para categorizeProducts", () => {
  let data01;

  beforeAll(() => {
    const data01Path = path.join(__dirname, "../../data01.json");
    data01 = readJSONFile(data01Path);
  });

  describe("Arquivo JSON válido", () => {
    it("deve categorizar corretamente os produtos a partir de um arquivo JSON válido", () => {
      const categorizedProducts = categorizeProducts(data01);

      expect(Array.isArray(categorizedProducts)).toBe(true);
      expect(categorizedProducts.length).toBeGreaterThan(0);

      categorizedProducts.forEach((category) => {
        expect(category).toHaveProperty("category");
        expect(category).toHaveProperty("count");
        expect(category).toHaveProperty("products");
        expect(Array.isArray(category.products)).toBe(true);
      });
    });
  });

  describe("Erros de leitura de arquivo", () => {
    it("deve lançar um erro se o arquivo JSON não existir", () => {
      expect(() => readJSONFile("../nonexistent.json")).toThrow(/ENOENT/);
    });
  });
});
