import '../style/global.css';

import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from 'react-error-boundary';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import isBetween from 'dayjs/plugin/isBetween';

import ErrorFallback from '../components/ErrorFallback/ErrorFallback';
import { logger } from '../utils/logger';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useEffect(() => {
        dayjs.locale('nb');
        dayjs.extend(isBetween);
    }, []);

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
                staleTime: Infinity,
                onError: (err) => {
                    logger.error('Error in react-query-client, query');
                    logger.error(err);
                },
            },
            mutations: {
                onError: (err) => {
                    logger.error('Error in react-query-client, mutation');
                    logger.error(err);
                },
            },
        },
    });

    const handleError = (error: Error, info: { componentStack: string }): void => {
        logger.error(`Error in boundary: ${JSON.stringify(info)}`);
        logger.error(error);
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                {/* devtools are automatically removed in production build */}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default MyApp;
