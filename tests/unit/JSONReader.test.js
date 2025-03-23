const JSONReader = require("../../src/utils/JSONReader.js");
const mockFs = require("mock-fs");
const path = require("path");

describe("JSONReader", () => {
  afterEach(() => {
    mockFs.restore();
  });

  it("deve ler e retornar o conteúdo de um arquivo JSON válido (caminho relativo)", () => {
    const mockData = JSON.stringify([
      { id: 1, title: "Produto A", price: 10.0 },
      { id: 2, title: "Produto B", price: 20.0 },
    ]);

    mockFs({
      [path.join(__dirname, "../../data01.json")]: mockData,
    });

    const dataReader = new JSONReader("../../data01.json");
    const data = dataReader.read();

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(2);
    expect(data[0]).toEqual({ id: 1, title: "Produto A", price: 10.0 });
    expect(data[1]).toEqual({ id: 2, title: "Produto B", price: 20.0 });
  });

  it("deve ler e retornar o conteúdo de um arquivo JSON válido (caminho absoluto)", () => {
    const mockData = JSON.stringify([
      { id: 1, title: "Produto A", price: 10.0 },
      { id: 2, title: "Produto B", price: 20.0 },
    ]);

    const absolutePath = path.join(__dirname, "data.json");

    mockFs({
      [absolutePath]: mockData,
    });

    const reader = new JSONReader(absolutePath);
    const data = reader.read();

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(2);
    expect(data[0]).toEqual({ id: 1, title: "Produto A", price: 10.0 });
    expect(data[1]).toEqual({ id: 2, title: "Produto B", price: 20.0 });
  });

  it("deve lançar um erro se o arquivo não existir", () => {
    mockFs({});

    const reader = new JSONReader("nonexistent.json");

    expect(() => {
      reader.read();
    }).toThrow(/ENOENT/);
  });

  it("deve lançar um erro se o arquivo não for um JSON válido", () => {
    mockFs({
      "invalid.json": "invalid content",
    });

    const reader = new JSONReader("invalid.json");

    expect(() => {
      reader.read();
    }).toThrow(/ENOENT/);
  });

  it("deve lançar um erro se o caminho do arquivo for inválido", () => {
    const reader = new JSONReader(null);

    expect(() => {
      reader.read();
    }).toThrow(/The \"path\" argument must be of type string. Received null/);
  });
});
