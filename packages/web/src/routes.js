import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Bank from './pages/bank';

const Routes = () => {
  return (
    <Switch>
      <Route path="/bank/:bankId">
        <Bank />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
