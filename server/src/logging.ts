import pino from 'pino';

const logger = pino({
    timestamp: false,
    prettyPrint: process.env.NODE_ENV !== 'production',
});

export default logger;
