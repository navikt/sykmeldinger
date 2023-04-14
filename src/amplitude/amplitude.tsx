import { useLayoutEffect, useRef } from 'react'
import { track, init } from '@amplitude/analytics-browser'
import { BaseEvent } from '@amplitude/analytics-types'
import { logger } from '@navikt/next-logger'

import { browserEnv } from '../utils/env'

import { AmplitudeTaxonomyEvents } from './taxonomyEvents'

export function initAmplitude(): void {
    if (typeof window === 'undefined' || browserEnv.NEXT_PUBLIC_AMPLITUDE_ENABLED !== 'true') return

    try {
        init('default', undefined, {
            useBatch: true,
            serverUrl: 'https://amplitude.nav.no/collect-auto',
            ingestionMetadata: {
                // This is a hack to provide collect-auto with the correct environment, won't be used within amplitude
                sourceName: window.location.toString(),
            },
        })
    } catch (e) {
        logger.warn(new Error('Failed to initialize amplitude', { cause: e }))
    }
}

export function useLogAmplitudeEvent(
    event: AmplitudeTaxonomyEvents,
    extraData?: Record<string, unknown>,
    condition: () => boolean = () => true,
): void {
    const stableEvent = useRef(event)
    const stableExtraData = useRef(extraData)
    const stableCondition = useRef(condition)

    useLayoutEffect(() => {
        if (stableCondition.current()) {
            logAmplitudeEvent(stableEvent.current, stableExtraData.current)
        }
    }, [])
}

export function logAmplitudeEvent(event: AmplitudeTaxonomyEvents, extraData?: Record<string, unknown>): void {
    if (browserEnv.NEXT_PUBLIC_AMPLITUDE_ENABLED !== 'true') {
        logDebugEvent(event, extraData)
        return
    }

    try {
        track(taxonomyToAmplitudeEvent(event, extraData))
    } catch (e) {
        logger.warn(new Error('Failed to log amplitude event', { cause: e }))
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
