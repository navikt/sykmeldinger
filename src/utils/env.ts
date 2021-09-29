type EnvironmentKeys =
    | 'RUNTIME_ENVIRONMENT'
    | 'SYKMELDINGER_BACKEND_PROXY_ROOT'
    | 'FLEX_GATEWAY_ROOT'
    | 'DITT_NAV_ROOT'
    | 'SYKMELDINGER_ROOT'
    | 'SYKEFRAVAER_ROOT'
    | 'LOGIN_SERVICE_URL'
    | 'LOGIN_SERVICE_REDIRECT_URL'
    | 'SYKEPENGESOKNAD_URL'
    | 'AMPLITUDE_ENABLED';

/**
 * Extend window object with the potential env object, but only for this file
 */
interface WindowWithEnv extends Window {
    _env_?: Record<string, unknown>;
}

declare const window: WindowWithEnv;

function getEnv(): Record<EnvironmentKeys, string | undefined> {
    // Both test and production pulls env from window._env_
    if (process.env.NODE_ENV !== 'development') {
        if (!window._env_) throw new Error('Unable to load client environment');
        // TODO verify shape
        return window._env_ as Record<EnvironmentKeys, string | undefined>;
    }

    return {
        RUNTIME_ENVIRONMENT: 'development',
        DITT_NAV_ROOT: '/dittnav',
        SYKEFRAVAER_ROOT: '/sykefravaer',
        SYKMELDINGER_ROOT: '/syk/sykmeldinger',
        SYKEPENGESOKNAD_URL: '/sykepengesoknad',
        LOGIN_SERVICE_URL: undefined,
        LOGIN_SERVICE_REDIRECT_URL: undefined,
        AMPLITUDE_ENABLED: 'true',
        SYKMELDINGER_BACKEND_PROXY_ROOT: '/sykmeldinger-backend-proxy',
        FLEX_GATEWAY_ROOT: '/flex-gateway',
    };
}

export default getEnv();
