import { logger } from '@navikt/next-logger'
import amplitude, { AmplitudeClient } from 'amplitude-js'

import { getPublicEnv } from '../utils/env'

import { AmplitudeTaxonomyEvents } from './taxonomyEvents'

const publicEnv = getPublicEnv()

class AmplitudeInstance {
    private instance: AmplitudeClient
    private isInitialized = false

    constructor() {
        this.instance = amplitude.getInstance()

        const amplitudeKey = publicEnv.AMPLITUDE_ENABLED
        if (amplitudeKey === 'true') {
            this.isInitialized = true
            this.instance.init('default', undefined, {
                apiEndpoint: 'amplitude.nav.no/collect-auto',
                saveEvents: true,
                includeUtm: true,
                batchEvents: false,
                includeReferrer: true,
                platform: window.location.toString(),
            })
        } else {
            logger.warn('Amplitude is not initialized because AMPLITUDE_ENABLED is not set')
        }
    }

    public logEvent(event: AmplitudeTaxonomyEvents, extraData?: Record<string, unknown>): void {
        const data = { ...('data' in event ? event.data : {}), ...extraData }

        if (!this.isInitialized) {
            logger.info(
                `Amplitude debug event: ${event.eventName} ${'data' in event || extraData ? JSON.stringify(data) : ''}`,
            )
            return
        }

        this.instance.logEvent(event.eventName, data)
    }
}

export default AmplitudeInstance
