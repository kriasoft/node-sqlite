module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/vendor-typings/**'
  ],
  testResultsProcessor: './node_modules/jest-junit-reporter',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/build',
    '/node_modules/',
    '/vendor-typings',
    '__tests__/data'
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 60,
      functions: 85,
      lines: 75
    }
  }
}
