const ITitleNormalizer = require("../interfaces/ITitleNormalizer");

class TitleNormalizer extends ITitleNormalizer {
  normalize(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .sort()
      .join(" ");
  }
}

module.exports = TitleNormalizer;
