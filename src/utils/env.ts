import getConfig from 'next/config';

export interface PublicEnv {
    publicPath: string | undefined;
    RUNTIME_ENVIRONMENT: 'dev' | 'test' | 'local' | 'labs' | 'production';
    DITT_NAV_ROOT: string;
    SYKEFRAVAER_ROOT: string;
    LOGIN_SERVICE_URL: string;
    LOGIN_SERVICE_REDIRECT_URL: string;
    SYKEPENGESOKNAD_URL: string;
    AMPLITUDE_ENABLED: string;
}

export interface ServerEnv {
    SYKMELDINGER_BACKEND: string;
    FLEX_GATEWAY_ROOT: string;
}

export function getPublicEnv(): PublicEnv {
    const { publicRuntimeConfig } = getConfig();

    return publicRuntimeConfig;
}

export function getServerEnv(): ServerEnv {
    const { serverRuntimeConfig } = getConfig();

    return serverRuntimeConfig;
}

export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || getPublicEnv().RUNTIME_ENVIRONMENT === 'labs';
