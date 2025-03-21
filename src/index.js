const readJSONFile = require("./fileReader");
const data01 = readJSONFile("../data01.json");

const categorizeProducts = require("./categorizeProducts");

const categorizedProducts = categorizeProducts(data01);
console.log(JSON.stringify(categorizedProducts, null, 2));
