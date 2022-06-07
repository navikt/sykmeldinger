import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN || 'https://95fc2e9124d74ef7931aa77b67cd8992@sentry.gc.nav.no/128',
    tracesSampleRate: 1.0,
    enabled: process.env.NODE_ENV === 'production',
    environment: process.env.RUNTIME_ENVIRONMENT,
});
