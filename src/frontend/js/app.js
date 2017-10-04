import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { checkLoggedIn } from './actions/Security';
import SecuredApplication from './containers/SecuredApplication';
import familyMenuApp from './reducers/familyMenuApp';


const store = createStore(familyMenuApp, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <SecuredApplication />
  </Provider>
);

render(<App />, document.getElementById('container'));
store.dispatch(checkLoggedIn());
