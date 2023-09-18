import type { DecoratorElements, DecoratorFetchProps } from '@navikt/nav-dekoratoren-moduler/ssr'
import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr'

import { browserEnv } from '~/utils/env'

export async function getDecoratorHTML(): Promise<DecoratorElements> {
    const config: DecoratorFetchProps = {
        env: createDecoratorEnv(),
        params: {
            language: 'nb',
            context: 'privatperson',
            // simple: true,
        },
    }

    return await fetchDecoratorHtml(config)
}

function createDecoratorEnv(): 'dev' | 'prod' {
    switch (browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
        case 'local':
        case 'test':
        case 'dev':
            return 'dev'
        case 'demo':
        case 'production':
            return 'prod'
        default:
            throw new Error(`Unknown runtime environment: ${browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT}`)
    }
}
