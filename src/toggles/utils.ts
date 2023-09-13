import { IToggle } from '@unleash/nextjs'

import { browserEnv } from '../utils/env'

import { EXPECTED_TOGGLES } from './toggles'

export function localDevelopmentToggles(): IToggle[] {
    return EXPECTED_TOGGLES.map(
        (it): IToggle => ({
            name: it,
            enabled: false,
            impressionData: false,
            variant: {
                name: 'disabled',
                enabled: false,
            },
        }),
    )
}

export function getUnleashEnvironment(): 'development' | 'production' {
    switch (browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
        case 'dev':
        case 'test':
        case 'local':
        case 'demo':
            return 'development'
        case 'production':
            return 'production'
    }
}
