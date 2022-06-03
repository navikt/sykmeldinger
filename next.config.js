/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
    assetPrefix: process.env.ASSET_PREFIX,
    eslint: {
        dirs: ['src'],
        ignoreDuringBuilds: true,
    },
    serverRuntimeConfig: {
        SYKMELDINGER_BACKEND: process.env.SYKMELDINGER_BACKEND,
        FLEX_GATEWAY_ROOT: process.env.FLEX_GATEWAY_ROOT,
    },
    publicRuntimeConfig: {
        publicPath: process.env.NEXT_PUBLIC_BASE_PATH,
        RUNTIME_ENVIRONMENT: process.env.RUNTIME_ENVIRONMENT,
        LOGIN_SERVICE_URL: process.env.LOGIN_SERVICE_URL,
        LOGIN_SERVICE_REDIRECT_URL: process.env.LOGIN_SERVICE_REDIRECT_URL,
        AMPLITUDE_ENABLED: process.env.AMPLITUDE_ENABLED,
        SYKEPENGESOKNAD_URL: process.env.SYKEPENGESOKNAD_URL,
        SYKEFRAVAER_ROOT: process.env.SYKEFRAVAER_ROOT,
        DITT_NAV_ROOT: process.env.DITT_NAV_ROOT,
    },
};

module.exports = nextConfig;
