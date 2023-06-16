import { z, ZodError } from 'zod'

export type PublicEnv = z.infer<typeof publicEnvSchema>
export const publicEnvSchema = z.object({
    PUBLIC_BASE_PATH: z.union([z.string(), z.undefined()]),
    PUBLIC_RUNTIME_ENVIRONMENT: z.union([
        z.literal('dev'),
        z.literal('test'),
        z.literal('local'),
        z.literal('demo'),
        z.literal('production'),
    ]),
    PUBLIC_MIN_SIDE_ROOT: z.string(),
    PUBLIC_SYKEFRAVAER_ROOT: z.string(),
    PUBLIC_SYKEPENGESOKNAD_URL: z.string(),
    PUBLIC_AMPLITUDE_ENABLED: z.string().optional(),
    PUBLIC_TELEMETRY_URL: z.string().optional(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>
export const serverEnvSchema = z.object({
    SYKMELDINGER_BACKEND: z.string(),
    SYKMELDINGER_BACKEND_SCOPE: z.string(),
    FLEX_SYKETILFELLE: z.string(),
    FLEX_SYKETILFELLE_BACKEND_SCOPE: z.string(),
    // Provided my nais
    IDPORTEN_CLIENT_ID: z.string(),
    IDPORTEN_WELL_KNOWN_URL: z.string(),
    TOKEN_X_WELL_KNOWN_URL: z.string(),
    TOKEN_X_PRIVATE_JWK: z.string(),
    TOKEN_X_CLIENT_ID: z.string(),
    // for unleash
    UNLEASH_SERVER_API_URL: z.string().optional(),
    UNLEASH_SERVER_API_TOKEN: z.string().optional(),
})

/**
 * These envs are available in the browser. They are replaced during the bundling step by NextJS.
 *
 * They MUST be provided during the build step.
 */
export const browserEnv = publicEnvSchema.parse({
    PUBLIC_BASE_PATH: import.meta.env.PUBLIC_BASE_PATH,
    PUBLIC_RUNTIME_ENVIRONMENT: import.meta.env.PUBLIC_RUNTIME_ENVIRONMENT,
    PUBLIC_AMPLITUDE_ENABLED: import.meta.env.PUBLIC_AMPLITUDE_ENABLED,
    PUBLIC_SYKEPENGESOKNAD_URL: import.meta.env.PUBLIC_SYKEPENGESOKNAD_URL,
    PUBLIC_SYKEFRAVAER_ROOT: import.meta.env.PUBLIC_SYKEFRAVAER_ROOT,
    PUBLIC_MIN_SIDE_ROOT: import.meta.env.PUBLIC_MIN_SIDE_ROOT,
    PUBLIC_TELEMETRY_URL: import.meta.env.PUBLIC_TELEMETRY_URL,
} satisfies Record<keyof PublicEnv, string | undefined>)

const getRawServerConfig = (): Partial<unknown> => ({
    // Provided by nais-*.yml
    SYKMELDINGER_BACKEND: import.meta.env.SYKMELDINGER_BACKEND,
    FLEX_SYKETILFELLE: import.meta.env.FLEX_SYKETILFELLE,
    SYKMELDINGER_BACKEND_SCOPE: import.meta.env.SYKMELDINGER_BACKEND_SCOPE,
    FLEX_SYKETILFELLE_BACKEND_SCOPE: import.meta.env.FLEX_SYKETILFELLE_BACKEND_SCOPE,
    // Provided by nais
    IDPORTEN_CLIENT_ID: import.meta.env.IDPORTEN_CLIENT_ID,
    IDPORTEN_WELL_KNOWN_URL: import.meta.env.IDPORTEN_WELL_KNOWN_URL,
    TOKEN_X_WELL_KNOWN_URL: import.meta.env.TOKEN_X_WELL_KNOWN_URL,
    TOKEN_X_PRIVATE_JWK: import.meta.env.TOKEN_X_PRIVATE_JWK,
    TOKEN_X_CLIENT_ID: import.meta.env.TOKEN_X_CLIENT_ID,
    // for unleash
    UNLEASH_SERVER_API_URL: import.meta.env.UNLEASH_SERVER_API_URL,
    UNLEASH_SERVER_API_TOKEN: import.meta.env.UNLEASH_SERVER_API_TOKEN,
})

/**
 * Server envs are lazy loaded and verified using Zod.
 */
export function getServerEnv(): ServerEnv & PublicEnv {
    try {
        return { ...serverEnvSchema.parse(getRawServerConfig()), ...publicEnvSchema.parse(browserEnv) }
    } catch (e) {
        if (e instanceof ZodError) {
            throw new Error(
                `The following envs are missing: ${
                    e.errors
                        .filter((it) => it.message === 'Required')
                        .map((it) => it.path.join('.'))
                        .join(', ') || 'None are missing, but zod is not happy. Look at cause'
                }`,
                { cause: e },
            )
        } else {
            throw e
        }
    }
}

export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || browserEnv.PUBLIC_RUNTIME_ENVIRONMENT === 'demo'
