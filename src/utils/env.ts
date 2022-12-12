import getConfig from 'next/config'

export interface PublicEnv {
    publicPath: string | undefined
    RUNTIME_ENVIRONMENT: 'dev' | 'test' | 'local' | 'labs' | 'production'
    MIN_SIDE_ROOT: string
    SYKEFRAVAER_ROOT: string
    SYKEPENGESOKNAD_URL: string
    AMPLITUDE_ENABLED: string
}

export interface ServerEnv {
    SYKMELDINGER_BACKEND: string
    SYKMELDINGER_BACKEND_SCOPE: string
    FLEX_SYKETILFELLE: string
    FLEX_SYKETILFELLE_BACKEND_SCOPE: string
    // Provided my nais
    IDPORTEN_CLIENT_ID: string
    IDPORTEN_WELL_KNOWN_URL: string
    TOKEN_X_WELL_KNOWN_URL: string
    TOKEN_X_PRIVATE_JWK: string
    TOKEN_X_CLIENT_ID: string
}

/**
 * Hack to get public envs that work even on static pages, see /src/pages/api/public-env.api.ts
 */
declare global {
    // eslint-disable-next-line no-var
    var publicEnv: PublicEnv
}

export function getPublicEnv(): PublicEnv {
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
        return getConfig().publicRuntimeConfig
    }

    return window.publicEnv
}

export function getServerEnv(): ServerEnv {
    const { serverRuntimeConfig } = getConfig()

    return serverRuntimeConfig
}

export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || getPublicEnv().RUNTIME_ENVIRONMENT === 'labs'
