import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.less';
import './basic.less';

import SykmeldingSide from './pages/Sykmeldingside/SykmeldingSide';

import useAppStore from './store/useAppStore';
import DataFetcher from './components/DataFetcher';
import TidslinjeSide from './pages/TidslinjeSide';

const App = () => {
    return (
        <useAppStore.Provider>
            <DataFetcher>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/sykmeldinger" component={SykmeldingSide} />
                        <Route path="/sykmeldinger/:id" component={SykmeldingSide} />
                        <Route path="/tidslinje" component={TidslinjeSide} />
                    </Switch>
                </BrowserRouter>
            </DataFetcher>
        </useAppStore.Provider>
    );
};

export default App;
