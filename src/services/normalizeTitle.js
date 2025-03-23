function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, " ") // Remove espaços extras
    .trim() // Remove espaços no início e no final
    .split(" ")
    .sort()
    .join(" ");
}

module.exports = normalizeTitle;
