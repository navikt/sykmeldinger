/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/explicit-function-return-type */
const pino = require('pino');

const logger = (defaultConfig = {}) =>
    pino({
        ...defaultConfig,
        timestamp: false,
        formatters: {
            level: (label) => {
                return { level: label };
            },
        },
    });

module.exports = {
    logger,
};
