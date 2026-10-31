const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  transform: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.
    // you can see this setting in tsconfig.jest.json -> "jsx": "react-jsx"
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
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

};
