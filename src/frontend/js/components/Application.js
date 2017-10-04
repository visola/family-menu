import React from 'react';

import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

const Application = () => (
  <BrowserRouter>
      <Route exact path="/">
        <p>Hello World!</p>
      </Route>
  </BrowserRouter>
);

export default Application;
