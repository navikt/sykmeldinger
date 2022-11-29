import '../style/global.css'

import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/nb'
import isBetween from 'dayjs/plugin/isBetween'
import { configureLogger } from '@navikt/next-logger'

import { createApolloClient } from '../fetching/apollo'
import { LabsWarning } from '../components/LabsWarning/LabsWarning'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import { initAmplitude } from '../amplitude/amplitude'

initAmplitude()
configureLogger({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useHandleDecoratorClicks()

    useEffect(() => {
        dayjs.locale('nb')
        dayjs.extend(isBetween)
    }, [])

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
