import amplitude, { AmplitudeClient } from 'amplitude-js';

import { getPublicEnv } from './env';

const publicEnv = getPublicEnv();

// https://github.com/navikt/analytics-taxonomy
type EventName =
    | 'skjema åpnet'
    | 'skjema startet'
    | 'skjemaspørsmål besvart'
    | 'skjemasteg fullført'
    | 'skjemavalidering feilet'
    | 'skjemainnsending feilet'
    | 'skjema fullført'
    | 'panel åpnet';

interface EventData {
    component: string;
}

class AmplitudeInstance {
    private instance: AmplitudeClient;

    constructor() {
        this.instance = amplitude.getInstance();

        const amplitudeKey = publicEnv.AMPLITUDE_ENABLED;
        if (amplitudeKey === 'true') {
            this.instance.init('default', undefined, {
                apiEndpoint: 'amplitude.nav.no/collect-auto',
                saveEvents: false,
                includeUtm: true,
                batchEvents: false,
                includeReferrer: true,
                platform: window.location.toString(),
            });
        } else {
            console.warn('Amplitude is not initialized because AMPLITUDE_ENABLED is not set');
        }
    }

    public logEvent(eventName: EventName, data: EventData): void {
        this.instance.logEvent(eventName, data);
    }
}

const amplitudeInstance = new AmplitudeInstance();
export default amplitudeInstance;
