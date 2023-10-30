/* eslint-disable @typescript-eslint/no-var-requires */

const isE2E = process.env.NEXT_PUBLIC_IS_E2E === 'true'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
const { buildCspHeader } = require('@navikt/nav-dekoratoren-moduler/ssr')

const appDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
    'script-src-elem': ["'self'", "'unsafe-inline'", 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
    'worker-src': ["'self'"],
    'connect-src': ["'self'", 'https://*.nav.no', 'https://*.uxsignals.com'],
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: !isE2E ? 'standalone' : undefined,
    reactStrictMode: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    transpilePackages: ['tailwind-merge'],
    experimental: {
        optimizePackageImports: ['@navikt/aksel-icons', '@navikt/ds-react'],
    },
    typescript: {
        ignoreBuildErrors: isE2E,
    },
    eslint: {
        dirs: ['src'],
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: '/:sykmeldingId/pdf',
                destination: '/api/generate-pdf/:sykmeldingId',
            },
        ]
    },
    async headers() {
        if (isE2E) return []

        const environment = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'production' ? 'prod' : 'dev'
        const cspValue = await buildCspHeader(appDirectives, { env: environment })

        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspValue,
                    },
                ],
            },
        ]
    },
    productionBrowserSourceMaps: true,
}

module.exports = withBundleAnalyzer(nextConfig)
