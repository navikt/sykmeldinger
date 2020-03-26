import './App.less';
import './basic.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingSide from './pages/SykmeldingSide';
import useAppStore from './data/useAppStore';

const App = () => {
    return (
        <useAppStore.Provider>
            <BrowserRouter>
                <p>browser router</p>
                <Switch>
                    <Route path={`${process.env.REACT_APP_SYKMELDING_ROOT}/:sykmeldingId`} component={SykmeldingSide} />
                </Switch>
            </BrowserRouter>
        </useAppStore.Provider>
    );
};

export default App;
