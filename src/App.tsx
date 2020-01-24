import './App.less';
import './basic.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingSide from './pages/SykmeldingSide';
import useAppStore from './store/useAppStore';

// TODO: Kun vis disse i dev. I prod og ved testing mot sykefravaer skal man redirectes tilbake til sykefravaer.
const SendtSykmelding = () => {
    return <div>Sykmeldingen ble sendt</div>;
};
const BekreftetSykmelding = () => {
    return <div>Sykmeldingen ble bekreftet</div>;
};
const AvbruttSykmelding = () => {
    return <div>Sykmeldingen ble avbrutt</div>;
};

const App = () => {
    return (
        <useAppStore.Provider>
            <BrowserRouter>
                <Switch>
                    <Route path="/sykmelding/:id" component={SykmeldingSide} />
                    <Route exact path="/sendt" component={SendtSykmelding} />
                    <Route exact path="/bekreftet" component={BekreftetSykmelding} />
                    <Route exact path="/avbrutt" component={AvbruttSykmelding} />
                </Switch>
            </BrowserRouter>
        </useAppStore.Provider>
    );
};

export default App;
