import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.less';

import DineSykmeldingerSide from './pages/DineSykmeldingerSide';
import SykmeldingSide from './pages/SykmeldingSide';
import DittSykefravaer from './pages/DittSykefravaerSide';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={DittSykefravaer} />
                <Route path="/sykmeldinger/:id" component={SykmeldingSide} />
                <Route path="/sykmeldinger" component={DineSykmeldingerSide} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
