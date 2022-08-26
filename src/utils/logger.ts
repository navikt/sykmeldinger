/* eslint-disable @typescript-eslint/no-var-requires */
import pino from 'pino';

import { getPublicEnv } from './env';
import { getUserRequestId } from './userRequestId';

const publicEnv = getPublicEnv();

const getFrontendLogger = (): pino.Logger => {
    const requestId = getUserRequestId();
    return pino({
        browser: {
            transmit: {
                send: async (level, logEvent) => {
                    try {
                        await fetch(`${publicEnv.publicPath ?? ''}/api/logger`, {
                            method: 'POST',
                            headers: { 'content-type': 'application/json', 'x-request-id': requestId },
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

export const createChildLogger = (requestId: string): pino.Logger => {
    return logger.child({ x_request_id: requestId, wat: true });
};
