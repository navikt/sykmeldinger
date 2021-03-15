import amplitude, { AmplitudeClient } from 'amplitude-js';

type EventName = 'EVENT_NAME' | 'EVENT_NAME_2';

class AmplitudeInstance {
    instance: AmplitudeClient;

    constructor() {
        this.instance = amplitude.getInstance();
        this.instance.init(process.env.REACT_APP_AMPLITUDE_KEY || '', undefined, {
            apiEndpoint: 'amplitude.nav.no/collect',
            saveEvents: false,
            includeUtm: true,
            batchEvents: false,
            includeReferrer: true,
            trackingOptions: {
                city: false,
                ip_address: false,
                version_name: false,
                region: false,
                country: false,
                dma: false,
            },
        });
    }

    public logEvent(eventName: EventName, data: any) {
        this.instance.logEvent(eventName, data);
    }
}

export default AmplitudeInstance;
