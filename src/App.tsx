import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.less';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={CompA} />
        <Route path="/sykmelding/:id" component={CompB} />
      </Switch>
    </BrowserRouter>
  );
};

const CompA = () => <h1>Hello world</h1>;
const CompB = () => <h1>Foo bar</h1>;

export default App;
