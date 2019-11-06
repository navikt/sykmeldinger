import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.less';

import SykmeldingSide from './pages/SykmeldingSide';

import useAppStore from './store/useAppStore';
import DataFetcher from './components/DataFetcher';

const App: React.FC = () => {
    return (
        <useAppStore.Provider>
            <DataFetcher>
                <BrowserRouter>
                    <Switch>
                        <Route path="/sykmeldinger/:id" component={SykmeldingSide} />
                    </Switch>
                </BrowserRouter>
            </DataFetcher>
        </useAppStore.Provider>
    );
};

export default App;
