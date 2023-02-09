import { useLayoutEffect, useRef } from 'react'
import type { BaseEvent, BrowserClient } from '@amplitude/analytics-types'
import { logger } from '@navikt/next-logger'

import { getPublicEnv } from '../utils/env'

import { AmplitudeTaxonomyEvents } from './taxonomyEvents'

const publicEnv = getPublicEnv()

let _amplitude: BrowserClient | null = null
async function getAmplitude(): Promise<BrowserClient> {
    if (_amplitude) return _amplitude

    return await initAmplitude()
}

async function initAmplitude(): Promise<BrowserClient> {
    _amplitude = await import('@amplitude/analytics-browser')
    _amplitude.init('default', undefined, {
        useBatch: true,
        serverUrl: 'https://amplitude.nav.no/collect-auto',
        ingestionMetadata: {
            // This is a hack to provide collect-auto with the correct environment, won't be used within _amplitude
            sourceName: window.location.toString(),
        },
    })

    return _amplitude
}

export function useLogAmplitudeEvent(event: AmplitudeTaxonomyEvents, extraData?: Record<string, unknown>): void {
    const stableEvent = useRef(event)
    const stableExtraData = useRef(extraData)

    useLayoutEffect(() => {
        logAmplitudeEvent(stableEvent.current, stableExtraData.current)
    }, [])
}

export async function logAmplitudeEvent(
    event: AmplitudeTaxonomyEvents,
    extraData?: Record<string, unknown>,
): Promise<void> {
    if (publicEnv.AMPLITUDE_ENABLED !== 'true') {
        logDebugEvent(event, extraData)
        return
    }

    try {
        const amplitude = await getAmplitude()
        amplitude.track(taxonomyToAmplitudeEvent(event, extraData))
    } catch (e) {
        logger.error(new Error(`Amplitude is un-initialized, can't log event: ${event.eventName}`, { cause: e }))
        return
    }
}

function taxonomyToAmplitudeEvent(
    event: AmplitudeTaxonomyEvents,
    extraData: Record<string, unknown> | undefined,
): BaseEvent {
    const properties = { ...('data' in event ? event.data : {}), ...extraData }

    return {
        event_type: event.eventName,
        event_properties: properties,
    }
}

function logDebugEvent(event: AmplitudeTaxonomyEvents, extraData?: Record<string, unknown>): void {
    const data = { ...('data' in event ? event.data : {}), ...extraData }

    logger.info(`Amplitude debug event: ${event.eventName} ${JSON.stringify(data)}`)
}
