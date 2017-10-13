import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Application from '../components/Application';
import LoginPage from '../containers/LoginPage';

const mapStateToProps = (state) => ({ loggedIn: state.security.loggedIn });

class SecuredApplicationComponent extends React.Component {
  render() {
    if (this.props.loggedIn === true) {
      return <Application />;
    }
    return <LoginPage />;
  }
}

SecuredApplicationComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const SecuredApplication = connect(mapStateToProps)(SecuredApplicationComponent);
export default SecuredApplication;
