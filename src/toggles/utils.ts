import { IToggle } from '@unleash/nextjs'

import { browserEnv } from '../utils/env'

import { ExpectedToggles } from './toggles'

const localDevelopmentToggles: Record<ExpectedToggles, IToggle> = {
    SYKMELDINGER_INSTRUMENTATION: {
        name: 'SYKMELDINGER_INSTRUMENTATION',
        enabled: true,
        impressionData: false,
        variant: {
            name: 'disabled',
            enabled: false,
        },
    },
    SYKMELDINGER_NEW_ROUTES: {
        name: 'SYKMELDINGER_NEW_ROUTES',
        enabled: true,
        impressionData: false,
        variant: {
            name: 'disabled',
            enabled: false,
        },
    },
}

export function getLocalDevelopmentToggles(): IToggle[] {
    return Object.values(localDevelopmentToggles)
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
