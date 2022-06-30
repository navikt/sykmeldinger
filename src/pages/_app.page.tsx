import '../style/global.css';

import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ErrorBoundary } from 'react-error-boundary';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import isBetween from 'dayjs/plugin/isBetween';

import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import { logger } from '../utils/logger';
import { createApolloClient } from '../fetching/apollo';

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
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </ErrorBoundary>
    );
}

export default MyApp;
