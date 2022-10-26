/* eslint-disable @typescript-eslint/no-var-requires */

const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('@sentry/nextjs').SentryWebpackPluginOptions}
 */
const sentryWebpackPluginOptions = {
    silent: true,
};

/**
 * @type {import('./src/utils/env').ServerEnv}
 */
const serverRuntimeConfig = {
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
};

/**
 * @type {import('./src/utils/env').PublicEnv}
 */
const publicRuntimeConfig = {
    publicPath: process.env.NEXT_PUBLIC_BASE_PATH,
    RUNTIME_ENVIRONMENT: process.env.RUNTIME_ENVIRONMENT,
    AMPLITUDE_ENABLED: process.env.AMPLITUDE_ENABLED,
    SYKEPENGESOKNAD_URL: process.env.SYKEPENGESOKNAD_URL,
    SYKEFRAVAER_ROOT: process.env.SYKEFRAVAER_ROOT,
    MIN_SIDE_ROOT: process.env.MIN_SIDE_ROOT,
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
    assetPrefix: process.env.ASSET_PREFIX,
    eslint: {
        dirs: ['src'],
        ignoreDuringBuilds: true,
    },
    serverRuntimeConfig,
    publicRuntimeConfig,
    async rewrites() {
        return [
            {
                source: '/:sykmeldingId/pdf',
                destination: '/api/generate-pdf/:sykmeldingId',
            },
        ];
    },
};

const nextConfigWithBundleAnalyzer = withBundleAnalyzer(nextConfig);

module.exports =
    process.env.SENTRY_ENABLED === 'true'
        ? withSentryConfig(nextConfigWithBundleAnalyzer, sentryWebpackPluginOptions)
        : nextConfigWithBundleAnalyzer;
