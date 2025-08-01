import { IToggle } from '@unleash/nextjs'

import { bundledEnv } from '../utils/env'

import { ExpectedToggles } from './toggles'

const enabled: Omit<IToggle, 'name'> = {
    enabled: true,
    impressionData: false,
    variant: {
        name: 'enabled',
        enabled: true,
    },
}

const disabled: Omit<IToggle, 'name'> = {
    ...enabled,
    enabled: false,
    variant: {
        name: 'disabled',
        enabled: false,
    },
}

const localToggleMap: Record<ExpectedToggles, IToggle> = {
    SYKMELDINGER_FLEXJAR_KVITTERING: {
        name: 'SYKMELDINGER_FLEXJAR_KVITTERING',
        ...disabled,
    },
}

export function localDevelopmentToggles(): IToggle[] {
    return Object.values(localToggleMap)
}

export function getUnleashEnvironment(): 'development' | 'production' {
    switch (bundledEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
        case 'dev':
        case 'test':
        case 'local':
        case 'demo':
            return 'development'
        case 'production':
            return 'production'
    }
}
