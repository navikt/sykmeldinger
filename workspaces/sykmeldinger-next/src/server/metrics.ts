import { collectDefaultMetrics, Histogram } from 'prom-client'
import { logger } from '@navikt/next-logger'
import { nextleton } from 'nextleton'

export class AppMetrics {
    constructor() {
        logger.info('Initializing metrics client')

        collectDefaultMetrics()
    }

    public backendApiDurationHistogram = new Histogram({
        name: 'sykmeldinger_requests_duration_seconds',
        help: 'Load time for API call to sykmeldinger-backend',
        labelNames: ['path'],
    })

    public flexApiDurationHistogram = new Histogram({
        name: 'flex_requests_duration_seconds',
        help: 'Load time for API call to sykmeldinger-backend',
        labelNames: ['path'],
    })
}

export default nextleton('metrics', () => new AppMetrics())
