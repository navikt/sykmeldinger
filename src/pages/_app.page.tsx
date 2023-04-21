// Polyfill this because it's needed for Safari 12 (mostly because of Apollo client?)
import 'globalthis-polyfill'

import '../style/global.css'

import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import React, { useState } from 'react'
import { configureLogger } from '@navikt/next-logger'

import { createApolloClient } from '../fetching/apollo'
import { LabsWarning } from '../components/LabsWarning/LabsWarning'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

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
