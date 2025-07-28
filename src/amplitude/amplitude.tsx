import { logAmplitudeEvent as dekoratorenLogAmplitudeEvent } from '@navikt/nav-dekoratoren-moduler'
import { useLayoutEffect, useRef } from 'react'
import { logger } from '@navikt/next-logger'

import { bundledEnv } from '../utils/env'

import { AmplitudeTaxonomyEvents } from './taxonomyEvents'

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

export async function logAmplitudeEvent(
    event: AmplitudeTaxonomyEvents,
    extraData?: Record<string, unknown>,
): Promise<void> {
    if (bundledEnv.NEXT_PUBLIC_AMPLITUDE_ENABLED !== 'true') {
        logDebugEvent(event, extraData)
        return
    }

    try {
        const baseEvent = taxonomyToAmplitudeEvent(event, extraData)
        await dekoratorenLogAmplitudeEvent({
            origin: window.location.toString(),
            eventName: baseEvent.event_type,
            eventData: baseEvent.event_properties,
        })
    } catch (e) {
        logger.warn(new Error('Failed to log amplitude event', { cause: e }))
    }
}

function taxonomyToAmplitudeEvent(
    event: AmplitudeTaxonomyEvents,
    extraData: Record<string, unknown> | undefined,
): {
    event_type: string
    event_properties: Record<string, unknown>
} {
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
