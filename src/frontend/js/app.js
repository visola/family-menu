import { Provider } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';

import Application from './components/Application';
import stores from './stores';

const App = () => (
  <Provider {...stores}>
    <Application />
  </Provider>
);

stores.security.checkLoggedIn();

render(<App />, document.getElementById('container'));