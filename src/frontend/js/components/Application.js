import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import Home from './Home';
import LoginPage from './LoginPage';
import PageNotFound from './PageNotFound';

@inject('security')
@observer
export default class Application extends React.Component {
  static propTypes = {
    security: PropTypes.object.isRequired,
  }

  render() {
    if (this.props.security.isLoggedIn === true) {
      return <BrowserRouter>
           <Switch>
             <Route exact={true} path='/' component={Home} />
             <Route component={PageNotFound} />
           </Switch>
       </BrowserRouter>;
    }

    return <LoginPage />;
  }
}