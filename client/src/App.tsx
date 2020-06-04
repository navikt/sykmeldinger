import './App.less';
import './basic.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingSide from './pages/SykmeldingSide';
import useAppStore from './data/useAppStore';

const App = () => {
    // Endepunkter for å støtte både https://tjenester.nav.no/sykmmleding og https://sykmelding.nais.adeo.no
    return (
        <useAppStore.Provider>
            <BrowserRouter>
                <Switch>
                    <Route path={`${process.env.REACT_APP_SYKMELDING_ROOT}/:sykmeldingId`} component={SykmeldingSide} />
                    <Route path="/:sykmeldingId" component={SykmeldingSide} />
                </Switch>
            </BrowserRouter>
        </useAppStore.Provider>
    );
};

export default App;
