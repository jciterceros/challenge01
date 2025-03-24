const createContainer = require("../../../src/config/container.js");
const TitleNormalizer = require("../../../src/services/TitleNormalizer.js");
const ProductCategorizer = require("../../../src/services/ProductCategorizer.js");

jest.mock("../../../src/services/TitleNormalizer.js", () => {
  return jest.fn().mockImplementation(() => {
    return { normalize: jest.fn() };
  });
});

jest.mock("../../../src/services/ProductCategorizer.js", () => {
  return jest.fn().mockImplementation(() => {
    return { categorize: jest.fn() };
  });
});

describe("createContainer", () => {
  it("should create a container with the correct instances", () => {
    const container = createContainer();

    expect(container).toHaveProperty("titleNormalizer");
    expect(container).toHaveProperty("productCategorizer");

    expect(TitleNormalizer).toHaveBeenCalledTimes(1);
    expect(ProductCategorizer).toHaveBeenCalledTimes(1);
    expect(ProductCategorizer).toHaveBeenCalledWith(container.titleNormalizer);
  });
});
