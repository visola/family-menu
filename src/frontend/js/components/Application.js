import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import PageNotFound from './PageNotFound';

const Application = () => (
  <BrowserRouter>
      <Switch>
        <Route exact={true} path='/' component={Home} />
        <Route component={PageNotFound} />
      </Switch>
  </BrowserRouter>
);

export default Application;
