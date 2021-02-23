import './App.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingSide from './pages/sykmelding/SykmeldingPage';
import SykmeldingerPage from './pages/sykmeldinger/SykmeldingerPage';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Switch>
                    <Route path="/sykmeldinger" exact component={SykmeldingerPage} />
                    <Route path="/sykmeldinger/:sykmeldingId" exact component={SykmeldingSide} />
                    <Route component={() => <h1>404 Page not found</h1>} />
                </Switch>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
