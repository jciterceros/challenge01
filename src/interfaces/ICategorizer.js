class ICategorizer {
  constructor() {
    if (this.constructor === ICategorizer) {
      throw new Error("Método 'categorize' deve ser implementado.");
    }
  }

  categorize(products) {
    throw new Error("Método 'categorize' deve ser implementado.");
  }
}

module.exports = ICategorizer;
