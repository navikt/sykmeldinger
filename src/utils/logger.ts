/* eslint-disable @typescript-eslint/no-var-requires */
import pino from 'pino';

import { getPublicEnv } from './env';
import { getUserRequestId } from './userTraceId';

const publicEnv = getPublicEnv();

const getFrontendLogger = (): pino.Logger => {
    const userTraceId = getUserRequestId();
    return pino({
        browser: {
            transmit: {
                send: async (level, logEvent) => {
                    try {
                        await fetch(`${publicEnv.publicPath ?? ''}/api/logger`, {
                            method: 'POST',
                            headers: { 'content-type': 'application/json', 'x-request-id': userTraceId },
                            body: JSON.stringify({
                                ...logEvent,
                                x_trace: new Error().stack,
                            }),
                        });
                    } catch (e) {
                        console.warn(e);
                        console.warn('Unable to log to backend', logEvent);
                    }
                },
            },
        },
    });
};

const createBackendLogger = (): pino.Logger => require('../../next-logger.config').logger();

export const logger: pino.Logger = typeof window !== 'undefined' ? getFrontendLogger() : createBackendLogger();
