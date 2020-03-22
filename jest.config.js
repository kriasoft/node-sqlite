module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  testResultsProcessor: './node_modules/jest-junit-reporter',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/build',
    '/node_modules/'
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 65,
      functions: 85,
      lines: 75
    }
  }
}
