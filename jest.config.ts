export default {
  roots: ['<rootDir>/src'],
  tsconfigRootDir: __dirname,
  project: ['./tsconfig.json'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: "coverage",
  testEnvironment:'node',
  clearMocks: true,
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};
