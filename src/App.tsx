import './App.less';
import './basic.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SykmeldingSide from './pages/SykmeldingSide';
import useAppStore from './store/useAppStore';

const App = () => {
    return (
        <useAppStore.Provider>
            <BrowserRouter>
                <Switch>
                    <Route path="/sykmelding/:id" component={SykmeldingSide} />
                </Switch>
            </BrowserRouter>
        </useAppStore.Provider>
    );
};

export default App;
