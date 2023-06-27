/* eslint-disable @typescript-eslint/no-var-requires */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
const { buildCspHeader } = require('@navikt/nav-dekoratoren-moduler/ssr')

/**
 * @type {import('next').NextConfig}
 */

const appDirectives = {
    'default-src': ["'self'"],
    'script-src': [
        "'self'",
        "'unsafe-eval'",
        "'unsafe-inline'",
        'https://uxsignals-frontend.uxsignals.app.iterate.no',
        'https://*.hotjar.com',
    ],
    'script-src-elem': [
        "'self'",
        "'unsafe-inline'",
        'https://uxsignals-frontend.uxsignals.app.iterate.no',
        'https://*.hotjar.com',
    ],
    'style-src': ["'self'", "'unsafe-inline'", 'https://*.hotjar.com'],
    'img-src': ["'self'", 'data:', 'https://*.hotjar.com'],
    'font-src': ["'self'", 'https://cdn.nav.no', 'https://*.hotjar.com'],
    'worker-src': ["'self'"],
    'connect-src': [
        "'self'",
        'https://*.nav.no',
        'https://*.uxsignals.com',
        'https://*.hotjar.com',
        'https://*.hotjar.io',
        'wss://*.hotjar.com',
    ],
    'frame-src': ['*.hotjar.com'],
}

const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    transpilePackages: ['tailwind-merge'],
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
