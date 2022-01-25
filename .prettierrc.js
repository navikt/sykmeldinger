module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
    overrides: [
        {
            files: ['*.yml', '*.yaml'],
            options: {
                bracketSpacing: false,
                tabWidth: 2,
            },
        },
    ],
};
