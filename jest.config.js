module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  setupFiles: [],
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  testPathIgnorePatterns: [
    '__testUtils__'
  ],
  clearMocks: true,
  restoreMocks: true,
  testMatch: [
    '**/*.spec.(js|ts)'
  ],
  roots: [
    '<rootDir>/src'
  ]
}
