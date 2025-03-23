module.exports = {
    testEnvironment: "node",
    collectCoverage: true,
    coverageDirectory: "coverage",
    testMatch: [
      "**/tests/unit/**/*.test.js",
      "**/tests/integration/**/*.test.js"
    ]
  };