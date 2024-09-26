module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/__test__/**/*.test.ts', '**/__test__/**/*.test.tsx'],
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: ['src/**/*.{ts,tsx,js}'], // Specify which files to collect coverage from
  coverageDirectory: 'coverage', // Directory to output coverage reports
  coverageReporters: ['text', 'lcov'], // Specify coverage reporters
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js', // Mock CSS/SCSS files
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Adjust the path if necessary
};
