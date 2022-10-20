import '../style/global.css';

import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ErrorBoundary } from 'react-error-boundary';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import isBetween from 'dayjs/plugin/isBetween';
import { configureLogger, logger } from '@navikt/next-logger';

import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import { createApolloClient } from '../fetching/apollo';
import { AmplitudeProvider } from '../amplitude/amplitude';

configureLogger({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useEffect(() => {
        dayjs.locale('nb');
        dayjs.extend(isBetween);
    }, []);

    const [apolloClient] = useState(() => {
        return createApolloClient();
    });

    const handleError = (error: Error, info: { componentStack: string }): void => {
        logger.error(`Error in boundary: ${JSON.stringify(info)}`);
        logger.error(error);
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
            <AmplitudeProvider>
                <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </AmplitudeProvider>
        </ErrorBoundary>
    );
}

export default MyApp;
