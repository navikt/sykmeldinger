import './App.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingPage from './pages/sykmelding/SykmeldingPage';
import SykmeldingerPage from './pages/sykmeldinger/SykmeldingerPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SykmeldingkvitteringPage from './pages/sykmeldingkvittering/SykmeldingkvitteringPage';
import NotFoundPage from './pages/notFound/NotFoundPage';
import { ErrorBoundary } from 'react-error-boundary';
import { logger } from './utils/logger';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import env from './utils/env';

const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
                staleTime: Infinity,
            },
        },
    });

    const handleError = (error: Error, info: { componentStack: string }) => {
        logger.error({ message: error.message, ...info });
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Switch>
                        <Route
                            path={env.SYKMELDINGER_ROOT || '/sykmeldinger'}
                            exact
                            component={SykmeldingerPage}
                        />
                        <Route
                            path={`${env.SYKMELDINGER_ROOT || '/sykmeldinger'}/:sykmeldingId`}
                            exact
                            component={SykmeldingPage}
                        />
                        <Route
                            path={`${env.SYKMELDINGER_ROOT || '/sykmeldinger'}/:sykmeldingId/kvittering`}
                            exact
                            component={SykmeldingkvitteringPage}
                        />
                        <Route component={NotFoundPage} />
                    </Switch>
                </BrowserRouter>
                {/* devtools are automatically removed in production build */}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ErrorBoundary>
    );
};

export default App;
