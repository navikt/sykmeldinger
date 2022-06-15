/* eslint-disable @typescript-eslint/no-var-requires */
import pino from 'pino';

import { getPublicEnv } from './env';

const publicEnv = getPublicEnv();

const getFrontendLogger = (): pino.Logger =>
    pino({
        browser: {
            transmit: {
                send: async (level, logEvent) => {
                    try {
                        await fetch(`${publicEnv.publicPath ?? ''}/api/logger`, {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify({ ...logEvent, x_trace: new Error().stack }),
                        });
                    } catch (e) {
                        console.warn(e);
                        console.warn('Unable to log to backend', logEvent);
                    }
                },
            },
        },
    });

const createBackendLogger = require('../../next-logger.config').logger;

export function logInfoWithRequestId(msg: string, requestId: string | string[] | undefined | null): void {
    logger.info({
        msg,
        'x-request-id': requestId,
    });
}

export function logErrorWithRequestId(msg: string, requestId: string | string[] | undefined | null): void {
    logger.error({
        msg,
        'x-request-id': requestId,
    });
}

export function logWarnWithRequestId(msg: string, requestId: string | string[] | undefined | null): void {
    logger.warn({
        msg,
        'x-request-id': requestId,
    });
}

export const logger: pino.Logger = typeof window !== 'undefined' ? getFrontendLogger() : createBackendLogger();
