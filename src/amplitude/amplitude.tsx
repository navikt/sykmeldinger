import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react'

import AmplitudeInstance from './AmplitudeInstance'
import { AmplitudeTaxonomyEvents } from './taxonomyEvents'

const AmplitudeContext = createContext<AmplitudeInstance | null>(null)

export function AmplitudeProvider({ children }: PropsWithChildren<unknown>): JSX.Element {
    const [amplitudeClient] = useState(() => (typeof window !== 'undefined' ? new AmplitudeInstance() : null))

    return <AmplitudeContext.Provider value={amplitudeClient}>{children}</AmplitudeContext.Provider>
}

export function useAmplitude(): (event: AmplitudeTaxonomyEvents, extraData?: Record<string, unknown>) => void {
    const amplitudeClient = useContext(AmplitudeContext)

    return useCallback(
        (event: AmplitudeTaxonomyEvents, extraData?: Record<string, unknown>): void => {
            amplitudeClient?.logEvent(event, extraData)
        },
        [amplitudeClient],
    )
}

export function useLogAmplitudeEvent(event: AmplitudeTaxonomyEvents, extraData?: Record<string, unknown>): void {
    const logEvent = useAmplitude()
    const stableEvent = useRef(event)
    const stableExtraData = useRef(extraData)

    useEffect(() => {
        logEvent(stableEvent.current, stableExtraData.current)
    }, [logEvent])
}
