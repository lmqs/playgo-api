export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  testEnvironment:'node',
  clearMocks: true,
  collectCoverage: true,
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};
