'use client'

import React, { PropsWithChildren, ReactElement } from 'react'
import { IToggle } from '@unleash/nextjs'
import { configureLogger } from '@navikt/next-logger'

import { FlagProvider } from '../toggles/context'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import { getFaro, initInstrumentation, pinoLevelToFaroLevel } from '../faro/faro'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'

type Props = {
    toggles: IToggle[]
}

initInstrumentation()
configureLogger({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    onLog: (log) =>
        getFaro()?.api.pushLog(log.messages, {
            level: pinoLevelToFaroLevel(log.level.label),
        }),
})

function Providers({ children, toggles }: PropsWithChildren<Props>): ReactElement {
    useHandleDecoratorClicks()

    return (
        <ErrorBoundary>
            <FlagProvider toggles={toggles}>{children}</FlagProvider>
        </ErrorBoundary>
    )
}

export default Providers
