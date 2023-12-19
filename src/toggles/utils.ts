import { IToggle } from '@unleash/nextjs'

import { browserEnv } from '../utils/env'

import { EXPECTED_TOGGLES, ExpectedToggles } from './toggles'

export function localDevelopmentToggles(): IToggle[] {
    return [
        ...EXPECTED_TOGGLES.filter((it) => it !== 'SYKMELDINGER_FISKERE').map(
            (it): IToggle => ({
                name: it,
                enabled: false,
                impressionData: false,
                variant: {
                    name: 'disabled',
                    enabled: false,
                },
            }),
        ),
        {
            name: 'SYKMELDINGER_FISKERE' satisfies ExpectedToggles,
            enabled: true,
            impressionData: false,
            variant: {
                name: 'disabled',
                enabled: false,
            },
        },
    ]
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
