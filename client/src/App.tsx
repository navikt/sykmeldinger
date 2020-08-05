import './App.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingSide from './pages/sykmelding/SykmeldingPage';
import SykmeldingerPage from './pages/sykmeldinger/SykmeldingerPage';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={`${process.env.REACT_APP_SYKMELDINGER_ROOT}`} exact component={SykmeldingerPage} />
                <Route
                    path={`${process.env.REACT_APP_SYKMELDINGER_ROOT}:sykmeldingId`}
                    exact
                    component={SykmeldingSide}
                />
                <Route component={() => <h1>404 Page not found</h1>} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
