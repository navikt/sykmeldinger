import { createLogger, transports, format } from 'winston';

const logger = createLogger({
    format: format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
    ],
});

export default logger;
