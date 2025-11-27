module.exports = {
  setupFiles: ['./jest.setup.js'],
  testMatch: [
    "**/src/**/*.spec.js",
    "**/src/**/*.test.js"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/baackend/"
  ],
};