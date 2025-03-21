function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, " ") // Remove espaços extras
    .split(" ")
    .sort()
    .join(" ");
}

module.exports = normalizeTitle;
