const ITitleNormalizer = require("../interfaces/ITitleNormalizer");

class TitleNormalizer extends ITitleNormalizer {
  normalize(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove caracteres especiais
      .replace(/-/g, " ") // Substitui hífens por espaços
      .replace(/\s+/g, " ") // Remove espaços extras
      .replace(/\b(feijao|feijão)\b/g, "feijão") // Padroniza "Feijão"
      .replace(/\b(carioca camil|camil carioca|camil tipo carioca)\b/g, "camil carioca") // Padroniza "Camil Carioca"
      .replace(/\b(semi\s*desnatado|semi\s*desnatada)\b/g, "semi desnatado") // Padroniza "Semi-Desnatado"
      .replace(/\b(1\s*litro|1000\s*ml|1\s*l)\b/g, "1l") // Padroniza volume para "1L"
      .replace(/\b(\d+)\s*(quilos?|kg|1000\s*g)\b/g, "$1kg") // Padroniza qualquer peso em kg
      .replace(/\b(\d+)\s*(gramas?|g)\b/g, "$1g") // Padroniza qualquer peso em g
      .replace(/\b(\d+)\s*(litros?|l|1000\s*ml)\b/g, "$1l") // Padroniza volume para L
      .replace(/\b(\d+)\s*ml\b/g, "$1ml") // Padroniza volume para ml
      .trim()
      .split(" ")
      .sort()
      .join(" ");
  }
}

module.exports = TitleNormalizer;
