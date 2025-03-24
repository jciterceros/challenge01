const JSONReader = require("../../../src/utils/JSONReader.js");
const mockFs = require("mock-fs");
const path = require("path");

describe("JSONReader", () => {
  afterEach(() => {
    mockFs.restore();
  });

  it("deve criar uma instância de JSONReader", () => {
    const reader = new JSONReader("data.json");

    expect(reader).toBeInstanceOf(JSONReader);
  });

  it("deve armazenar o caminho do arquivo JSON", () => {
    const reader = new JSONReader("data.json");

    expect(reader.filePath).toBe("data.json");
  });

  it("deve ler e retornar o conteúdo de um arquivo JSON válido (caminho relativo)", () => {
    const mockData = JSON.stringify([
      { id: 1, title: "Produto A", price: 10.0 },
      { id: 2, title: "Produto B", price: 20.0 },
    ]);

    const relativePath = path.join(__dirname, "data01.json");

    mockFs({
      [relativePath]: mockData,
    });

    const dataReader = new JSONReader("./tests/unit/utils/data01.json");
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
    }).toThrow(/O arquivo não foi encontrado:/);
  });

  it("deve lançar um erro se o arquivo não for um JSON válido", () => {
    mockFs({
      "invalid.json": "invalid content",
    });

    const reader = new JSONReader("invalid.json");

    expect(() => {
      reader.read();
    }).toThrow(/Erro ao analisar o arquivo JSON: Unexpected token i in JSON at position 0/);
  });

  it("deve lançar um erro se o caminho do arquivo for inválido", () => {
    let reader;
    try {
      reader = new JSONReader(null);
    } catch (error) {
      expect(error.message).toBe("O caminho do arquivo deve ser uma string válida.");
    }

    expect(() => {
      reader.read();
    }).toThrow("Cannot read properties of undefined (reading 'read')");
  });

  it("deve lançar um erro se o arquivo estiver vazio", () => {
    mockFs({
      "empty.json": "",
    });

    const reader = new JSONReader("empty.json");

    expect(() => {
      reader.read();
    }).toThrow("O arquivo está vazio.");
  });

  it("deve lidar com arquivos JSON contendo objetos complexos", () => {
    const mockData = JSON.stringify({
      users: [
        { id: 1, name: "Alice", roles: ["admin", "user"] },
        { id: 2, name: "Bob", roles: ["user"] },
      ],
    });

    mockFs({
      "complex.json": mockData,
    });

    const reader = new JSONReader("complex.json");
    const data = reader.read();

    expect(data).toHaveProperty("users");
    expect(data.users).toHaveLength(2);
    expect(data.users[0]).toEqual({ id: 1, name: "Alice", roles: ["admin", "user"] });
    expect(data.users[1]).toEqual({ id: 2, name: "Bob", roles: ["user"] });
  });

  it("deve lançar um erro se o caminho do arquivo for uma string vazia", () => {
    let reader;
    try {
      reader = new JSONReader("");
    } catch (error) {
      expect(error.message).toBe("O caminho do arquivo deve ser uma string válida.");
    }

    expect(() => {
      reader.read();
    }).toThrow("Cannot read properties of undefined (reading 'read')");
  });
});
