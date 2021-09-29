import { Response } from 'express';

export function createClientEnv(): Record<string, string | undefined> {
    return {
        RUNTIME_ENVIRONMENT: process.env.RUNTIME_ENVIRONMENT,
        DITT_NAV_ROOT: process.env.DITT_NAV_ROOT,
        SYKEFRAVAER_ROOT: process.env.SYKEFRAVAER_ROOT,
        SYKMELDINGER_ROOT: process.env.SYKMELDINGER_ROOT,
        SYKEPENGESOKNAD_URL: process.env.SYKEPENGESOKNAD_URL,
        LOGIN_SERVICE_URL: process.env.LOGIN_SERVICE_URL,
        LOGIN_SERVICE_REDIRECT_URL: process.env.LOGIN_SERVICE_REDIRECT_URL,
        AMPLITUDE_ENABLED: process.env.AMPLITUDE_ENABLED,
        SYKMELDINGER_BACKEND_PROXY_ROOT: process.env.SYKMELDINGER_BACKEND_PROXY_ROOT,
        FLEX_GATEWAY_ROOT: process.env.FLEX_GATEWAY_ROOT,
    };
}

export function disableCache(res: Response): Response {
    return res
        .setHeader('Pragma', 'no-cache')
        .setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
        .setHeader('Expires', '-1');
}
