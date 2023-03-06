import '../style/global.css'

import * as dateFns from 'date-fns'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import React, { useState } from 'react'
import { configureLogger } from '@navikt/next-logger'

import { createApolloClient } from '../fetching/apollo'
import { LabsWarning } from '../components/LabsWarning/LabsWarning'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import { initAmplitude } from '../amplitude/amplitude'

if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.dateFns = dateFns
}

initAmplitude()
configureLogger({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useHandleDecoratorClicks()

    const [apolloClient] = useState(() => {
        return createApolloClient()
    })

    return (
        <ErrorBoundary>
            <ApolloProvider client={apolloClient}>
                <LabsWarning />
                <main id="maincontent" role="main" tabIndex={-1}>
                    <Component {...pageProps} />
                </main>
            </ApolloProvider>
        </ErrorBoundary>
    )
}

export default MyApp
