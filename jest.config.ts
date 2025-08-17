import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }]
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/tests/mocks/setupMocks.ts'],
  testMatch: [
    '<rootDir>/tests/**/*.{test,spec}.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/tests/mocks/emptySvgMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    // Add these lines for next-intl
    'next-intl/config': '<rootDir>/src/i18n/config.ts',
    'next-intl(.*)': 'next-intl$1',
    '^next-intl/dist/esm/production/index$': 'next-intl',
    '^next-intl/dist/esm/production/navigation$': 'next-intl/navigation'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverage: true,
  coverageReporters: ['text', 'html', 'lcov'],
  transformIgnorePatterns: ['/node_modules/(?!(next-intl|use-intl)/).+\\.js$'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/setupTests.{ts}',
    '!src/main.tsx',
    '!src/types/**'
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50
    }
  }
};

export default config;
