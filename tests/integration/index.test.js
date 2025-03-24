const JSONReader = require("../../src/utils/JSONReader.js");
const TitleNormalizer = require("../../src/services/TitleNormalizer.js");
const ProductCategorizer = require("../../src/services/ProductCategorizer.js");
const path = require("path");
const fs = require("fs");

describe("Testes de Integração para categorizeProducts", () => {
  const data01Path = path.join(__dirname, "../../data01.json");

  let categorizeProducts;

  beforeEach(() => {
    const titleNormalizer = new TitleNormalizer();
    categorizeProducts = new ProductCategorizer(titleNormalizer);
  });

  describe("Arquivo JSON válido", () => {
    it("deve categorizar corretamente os produtos a partir de um arquivo JSON válido", () => {
      const data = new JSONReader(data01Path).read();
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

  it("deve retornar uma lista vazia para um arquivo JSON vazio", () => {
    const emptyJSONPath = path.join(__dirname, "../../empty.json");
    fs.writeFileSync(emptyJSONPath, "[]");

    const data = new JSONReader(emptyJSONPath).read();
    const result = categorizeProducts.categorize(data);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);

    fs.unlinkSync(emptyJSONPath);
  });

  it("deve lançar um erro para dados inválidos no JSON", () => {
    const invalidJSONPath = path.join(__dirname, "../../invalid.json");
    fs.writeFileSync(invalidJSONPath, '[{"title": "", "supermarket": ""}]');

    const data = new JSONReader(invalidJSONPath).read();

    expect(() => categorizeProducts.categorize(data)).toThrow("Cada produto deve ter um título e um supermercado.");

    fs.unlinkSync(invalidJSONPath);
  });

  describe("Erros de leitura de arquivo", () => {
    it("deve lançar um erro se o arquivo não for um JSON válido", () => {
      const invalidJSONPath = path.join(__dirname, "../../invalid.json");
      fs.writeFileSync(invalidJSONPath, "conteúdo inválido");

      expect(() => new JSONReader(invalidJSONPath).read()).toThrow();

      fs.unlinkSync(invalidJSONPath);
    });

    it("deve lançar um erro ao tentar ler um arquivo inexistente", () => {
      const invalidPath = path.join(__dirname, "../../nonexistent.json");

      expect(() => new JSONReader(invalidPath).read()).toThrow("O arquivo não foi encontrado:");
    });
  });

  describe("deve lançar um erro ao ler um arquivo de dados", () => {
    it("deve lançar um erro ao ler um arquivo de dados", () => {
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const invalidPath = path.join(__dirname, "../../invalid.json");

      expect(() => new JSONReader(invalidPath).read()).toThrow("O arquivo não foi encontrado:");

      spy.mockRestore();
    });
  });

  describe("deve lançar erro caso a função main falhe", () => {
    it("deve lançar erro caso a função main falhe", () => {
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});
      const invalidPath = path.join(__dirname, "../../invalid.json");

      expect(() => new JSONReader(invalidPath).read()).toThrow("O arquivo não foi encontrado");

      spy.mockRestore();
    });
  });
});
