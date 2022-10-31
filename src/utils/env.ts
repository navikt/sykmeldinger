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

export function getPublicEnv(): PublicEnv {
    const { publicRuntimeConfig } = getConfig()

    return publicRuntimeConfig
}

export function getServerEnv(): ServerEnv {
    const { serverRuntimeConfig } = getConfig()

    return serverRuntimeConfig
}

export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || getPublicEnv().RUNTIME_ENVIRONMENT === 'labs'
