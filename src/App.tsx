import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.less';

import DineSykmeldingerSide from './pages/DineSykmeldingerSide';
import SykmeldingSide from './pages/SykmeldingSide';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={DineSykmeldingerSide} />
        <Route path="/sykmelding/:id" component={SykmeldingSide} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
