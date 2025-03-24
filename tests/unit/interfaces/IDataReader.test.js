const assert = require("assert");
const IDataReader = require("../../../src/interfaces/IDataReader");

describe("IDataReader Interface", () => {
  it("deve lançar um erro se read não for implementado", () => {
    const reader = new IDataReader();
    assert.throws(() => {
      reader.read();
    }, /Método 'read' deve ser implementado/);
  });

  it("deve permitir que uma subclasse implemente o método read", () => {
    class DataReaderMock extends IDataReader {
      read() {
        return "data";
      }
    }

    const reader = new DataReaderMock();
    assert.strictEqual(reader.read(), "data");
  });
});
