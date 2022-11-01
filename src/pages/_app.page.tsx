import '../style/global.css'

import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/nb'
import isBetween from 'dayjs/plugin/isBetween'
import { configureLogger } from '@navikt/next-logger'

import { createApolloClient } from '../fetching/apollo'
import { AmplitudeProvider } from '../amplitude/amplitude'
import { LabsWarning } from '../components/LabsWarning/LabsWarning'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

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
            <AmplitudeProvider>
                <ApolloProvider client={apolloClient}>
                    <LabsWarning />
                    <Component {...pageProps} />
                </ApolloProvider>
            </AmplitudeProvider>
        </ErrorBoundary>
    )
}

export default MyApp
