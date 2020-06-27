module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.tsx"],
  coverageReporters: ["html"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "@api/(.*)$": "<rootDir>/api/src/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  verbose: true,
};
