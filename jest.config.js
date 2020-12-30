const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/src/jest.setup.ts",
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // source: https://github.com/dividab/tsconfig-paths/issues/97
  // note to future self: don't get fancy with nice resolvers like @components/, it's not worth the trouble
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: `<rootDir>/${compilerOptions.baseUrl}/`,
  }),
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
};
