class IDataReader {
  read() {
    throw new Error("Método 'read' deve ser implementado.");
  }
}

module.exports = IDataReader;
