// eslint-disable-next-line no-undef
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  rootDir: 'src',
  testRegex: ['.*\\.test\\.ts$', '.*\\.test\\.tsx$'],
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/themes.ts',
    '<rootDir>/types/.*',
    '/jest.config.js',
    '<rootDir>/index.tsx',
    '<rootDir>/app.tsx',
    '.eslintrc.js',
    '<rootDir>/components/error-boundary.component.tsx',
    '<rootDir>/react-app-env.d.ts',
    '<rootDir>/store.ts',
    '<rootDir>/reportWebVitals.ts',
    '<rootDir>/service-worker.ts',
    '<rootDir>/storage/client.ts',
    '<rootDir>/dates/formats.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: [],
};
