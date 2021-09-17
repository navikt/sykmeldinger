import { config } from 'dotenv';

import logger from './logging';
import { startServer } from './server';

if (process.env.NODE_ENV !== 'production') {
    logger.warn('Running in development mode, loading .env');
    config();
}

startServer();
