import './App.less';
import './basic.less';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DataFetcher from './components/DataFetcher';
import SykmeldingSide from './pages/SykmeldingSide';
import useAppStore from './store/useAppStore';

const App = () => {
    return (
        <useAppStore.Provider>
            <DataFetcher>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/sykmeldinger" component={SykmeldingSide} />
                        <Route path="/sykmeldinger/:id" component={SykmeldingSide} />
                    </Switch>
                </BrowserRouter>
            </DataFetcher>
        </useAppStore.Provider>
    );
};

export default App;
