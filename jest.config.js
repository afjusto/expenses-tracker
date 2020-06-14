module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.tsx"],
  coverageReporters: ["html"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
