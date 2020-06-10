import './App.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingSide from './pages/sykmelding/SykmeldingSide';
import SykmeldingerPage from './pages/sykmeldinger/SykmeldingerPage';
import useAppStore from './data/useAppStore';

const App = () => {
    // Endepunkter for å støtte både https://tjenester.nav.no/sykmmleding og https://sykmelding.nais.adeo.no
    return (
        <useAppStore.Provider>
            <BrowserRouter>
                <Switch>
                    <Route path=`${process.env.REACT_APP_SYKEFRAVAER_ROOT}/sykmeldinger` exact component={SykmeldingerPage} />
                    <Route
                        path={`${process.env.REACT_APP_SYKEFRAVAER_ROOT}/sykmeldinger/:sykmeldingId`}
                        component={SykmeldingSide}
                    />
                    <Route path="/sykmeldinger/:sykmeldingId" component={SykmeldingSide} />
                </Switch>
            </BrowserRouter>
        </useAppStore.Provider>
    );
};

export default App;
