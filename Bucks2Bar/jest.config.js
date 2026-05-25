module.exports = {
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: ['script.js', '!node_modules/**'],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50,
        },
    },
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
    moduleFileExtensions: ['js', 'json'],
    verbose: true,
};
