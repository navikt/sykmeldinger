import './App.less';
import './basic.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingSide from './pages/SykmeldingSide';
import useAppStore from './data/useAppStore';

const Testcomponent = ({ text = 'hello world' }: any) => {
    return <p>{text}</p>;
};

const App = () => {
    return (
        <useAppStore.Provider>
            <BrowserRouter>
                <Switch>
                    <Route path={`${process.env.REACT_APP_SYKMELDING_ROOT}/:sykmeldingId`} component={SykmeldingSide} />
                    <Route path="/:sykmeldingId" component={SykmeldingSide} />
                    <Route path="/" component={Testcomponent} />
                </Switch>
            </BrowserRouter>
        </useAppStore.Provider>
    );
};

export default App;
