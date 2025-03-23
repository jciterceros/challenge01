const readJSONFile = require("../../src/utils/fileReader.js");
const path = require("path");

describe("readJSONFile", () => {
  it("deve ler e retornar o conteúdo do arquivo data01.json corretamente", () => {
    const data01Path = path.join(__dirname, "../../data01.json");
    const data = readJSONFile(data01Path);

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    // Verifica o primeiro item do arquivo
    expect(data[0]).toEqual({
      id: 1,
      title: "Leite Integral Piracanjuba 1L",
      supermarket: "Supermercado A",
      price: 4.99,
    });

    // Verifica o último item do arquivo
    expect(data[data.length - 1]).toEqual({
      id: 80,
      title: "Macarrão Fortaleza Parafuso 500g",
      supermarket: "Supermercado D",
      price: 5.09,
    });
  });

  it("deve lançar um erro se o arquivo não existir", () => {
    const invalidPath = "../nonexistent.json";

    expect(() => {
      readJSONFile(invalidPath);
    }).toThrow();
  });

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
