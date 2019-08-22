module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json'],
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    testMatch: [
        '**/*.spec.js',
        '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
    ],
    transformIgnorePatterns: ['./node_modules/'],
    moduleNameMapper: {
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
        "^.+\\.html?$": "html-loader-jest"
    }
};