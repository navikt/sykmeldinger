module.exports = {
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    //coverageThreshold: {
    //  global: {
    //    branches: 80,
    //    functions: 80,
    //    lines: 80,
    //    statements: 80
    //  }
    //},
    // coverageReporters: ["json", "lcov", "text", "clover"]
};
