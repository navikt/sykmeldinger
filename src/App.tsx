import './App.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingPage from './pages/sykmelding/SykmeldingPage';
import SykmeldingerPage from './pages/sykmeldinger/SykmeldingerPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SykmeldingkvitteringPage from './pages/sykmeldingkvittering/SykmeldingkvitteringPage';

const App = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Switch>
                    <Route
                        path={window._env_?.SYKMELDINGER_ROOT || '/sykmeldinger'}
                        exact
                        component={SykmeldingerPage}
                    />
                    <Route
                        path={`${window._env_?.SYKMELDINGER_ROOT || '/sykmeldinger'}/:sykmeldingId`}
                        exact
                        component={SykmeldingPage}
                    />
                    <Route
                        path={`${window._env_?.SYKMELDINGER_ROOT || '/sykmeldinger'}/:sykmeldingId/kvittering`}
                        exact
                        component={SykmeldingkvitteringPage}
                    />
                    <Route component={() => <h1>404 Page not found</h1>} />
                </Switch>
            </BrowserRouter>
            {/* devtools are automatically removed in production build */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
