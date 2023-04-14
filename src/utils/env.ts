import { z, ZodError } from 'zod'

export type PublicEnv = z.infer<typeof publicEnvSchema>
export const publicEnvSchema = z.object({
    NEXT_PUBLIC_BASE_PATH: z.union([z.string(), z.undefined()]),
    NEXT_PUBLIC_RUNTIME_ENVIRONMENT: z.union([
        z.literal('dev'),
        z.literal('test'),
        z.literal('local'),
        z.literal('demo'),
        z.literal('production'),
    ]),
    NEXT_PUBLIC_MIN_SIDE_ROOT: z.string(),
    NEXT_PUBLIC_SYKEFRAVAER_ROOT: z.string(),
    NEXT_PUBLIC_SYKEPENGESOKNAD_URL: z.string(),
    NEXT_PUBLIC_AMPLITUDE_ENABLED: z.string(),
    NEXT_PUBLIC_DISPLAY_EGENMELDING: z.string(),
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
})

/**
 * These envs are available in the browser. They are replaced during the bundling step by NextJS.
 *
 * They MUST be provided during the build step.
 */
export const browserEnv = publicEnvSchema.parse({
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    NEXT_PUBLIC_RUNTIME_ENVIRONMENT: process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT,
    NEXT_PUBLIC_AMPLITUDE_ENABLED: process.env.NEXT_PUBLIC_AMPLITUDE_ENABLED,
    NEXT_PUBLIC_SYKEPENGESOKNAD_URL: process.env.NEXT_PUBLIC_SYKEPENGESOKNAD_URL,
    NEXT_PUBLIC_SYKEFRAVAER_ROOT: process.env.NEXT_PUBLIC_SYKEFRAVAER_ROOT,
    NEXT_PUBLIC_MIN_SIDE_ROOT: process.env.NEXT_PUBLIC_MIN_SIDE_ROOT,
    NEXT_PUBLIC_DISPLAY_EGENMELDING: process.env.NEXT_PUBLIC_DISPLAY_EGENMELDING,
})

const getRawServerConfig = (): Partial<unknown> => ({
    // Provided by nais-*.yml
    SYKMELDINGER_BACKEND: process.env.SYKMELDINGER_BACKEND,
    FLEX_SYKETILFELLE: process.env.FLEX_SYKETILFELLE,
    SYKMELDINGER_BACKEND_SCOPE: process.env.SYKMELDINGER_BACKEND_SCOPE,
    FLEX_SYKETILFELLE_BACKEND_SCOPE: process.env.FLEX_SYKETILFELLE_BACKEND_SCOPE,
    // Provided by nais
    IDPORTEN_CLIENT_ID: process.env.IDPORTEN_CLIENT_ID,
    IDPORTEN_WELL_KNOWN_URL: process.env.IDPORTEN_WELL_KNOWN_URL,
    TOKEN_X_WELL_KNOWN_URL: process.env.TOKEN_X_WELL_KNOWN_URL,
    TOKEN_X_PRIVATE_JWK: process.env.TOKEN_X_PRIVATE_JWK,
    TOKEN_X_CLIENT_ID: process.env.TOKEN_X_CLIENT_ID,
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

/**
 * Turn this into a function, because we need to make this a timed toggle later
 */
export function isEgenmeldingsdagerEnabled(): boolean {
    return process.env.NEXT_PUBLIC_DISPLAY_EGENMELDING === 'true'
}

export const isLocalOrDemo =
    process.env.NODE_ENV !== 'production' || browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'demo'
