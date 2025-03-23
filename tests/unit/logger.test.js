const logger = require("../../src/config/logger.js");
const winston = require("winston");

describe("Logger", () => {
  let transportSpy;

  beforeEach(() => {
    // Espionar o console para capturar logs
    transportSpy = jest.spyOn(logger.transports[0], "log");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("deve registrar mensagens de info corretamente", () => {
    logger.info("Teste de log", { key: "value" });

    expect(transportSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "info",
        message: expect.stringContaining("Teste de log"),
      }),
      expect.any(Function)
    );
  });

  it("deve registrar mensagens de erro corretamente", () => {
    logger.error("Erro de teste", { error: "details" });

    expect(transportSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "error",
        message: expect.stringContaining("Erro de teste"),
      }),
      expect.any(Function)
    );
  });

  it("não deve registrar mensagens se o nível for menor que o configurado", () => {
    logger.level = "info";

    logger.debug("Mensagem de debug que não deve ser registrada");

    expect(transportSpy).not.toHaveBeenCalled();
  });
});
