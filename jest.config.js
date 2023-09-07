// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/themes.ts',
    '<rootDir>/src/types/.*',
    '/jest.config.js',
    './src/index.tsx',
    '.eslintrc.js',
    '<rootDir>/src/componets/error-bounadry/error-boundary.comp.tsx',
    '<rootDir>/src/react-app-env.d.ts',
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  moduleDirectories: ['node_modules'],
  rootDir: 'src',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'src/app/hooks/**/*.{js,jsx,ts,tsx}': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    'src/app/custom-hooks/**/*.{js,jsx,ts,tsx}': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
