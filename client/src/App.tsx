import './App.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingSide from './pages/sykmelding/SykmeldingPage';
import SykmeldingerPage from './pages/sykmeldinger/SykmeldingerPage';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SykmeldingerPage} />
                <Route path="/:sykmeldingId" component={SykmeldingSide} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
