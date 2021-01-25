module.exports = {
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$",
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/test/jest/__mocks__/styleMock.js",
    "\\.(png|jpg|jpeg)$": "<rootDir>/test/jest/__mocks__/fileMock.js",
  },
};
