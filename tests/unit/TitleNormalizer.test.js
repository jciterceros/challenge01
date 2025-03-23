const TitleNormalizer = require("../../src/services/TitleNormalizer.js");
const normalizeTitle = new TitleNormalizer().normalize;

describe("normalizeTitle", () => {
  test("deve normalizar e ordenar as palavras de um título", () => {
    expect(normalizeTitle("Leite Integral Piracanjuba 1L")).toBe("1l integral leite piracanjuba");
    expect(normalizeTitle("Leite Piracanjuba Integral 1L")).toBe("1l integral leite piracanjuba");
    expect(normalizeTitle("Leite Integral Italac 1L")).toBe("1l integral italac leite");
    expect(normalizeTitle("Leite Piracanjuba Semi Desnatado 1 Litro")).toBe("1 desnatado leite litro piracanjuba semi");
  });

  test("deve remover caracteres especiais", () => {
    expect(normalizeTitle("Leite! Integral? Piracanjuba@ 1L#")).toBe("1l integral leite piracanjuba");
  });

  test("deve normalizar títulos com espaços extras", () => {
    expect(normalizeTitle("  Leite  Integral   Piracanjuba    1L ")).toBe("1l integral leite piracanjuba");
  });

  test("deve tratar letras maiúsculas e minúsculas como iguais", () => {
    expect(normalizeTitle("LEITE integral PIRACANJUBA 1L")).toBe("1l integral leite piracanjuba");
  });

  test("deve lidar com títulos contendo apenas números e letras", () => {
    expect(normalizeTitle("123 ABC")).toBe("123 abc");
  });

  test("deve lidar com strings vazias", () => {
    expect(normalizeTitle("")).toBe("");
  });
});
