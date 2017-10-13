import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CreateFamilyForm from '../components/CreateFamilyForm';
import LoginForm from '../components/LoginForm';

import { create, login } from '../actions/Security';

class LoginPage extends React.Component {
  render() {
    return <div className="login-page">
      <LoginForm
        loggingIn={this.props.loggingIn}
        loggingError={this.props.loggingError}
        onSubmit={this.props.onSubmitLogin} />
      <hr />
      <p>Or create a new family to get started</p>
      <CreateFamilyForm
        creating={this.props.creating}
        createError={this.props.createError}
        onSubmit={this.props.onSubmitCreate} />
    </div>;
  }
}

LoginPage.propTypes = {
  createError: PropTypes.string,
  creating: PropTypes.bool.isRequired,
  loggingError: PropTypes.string,
  loggingIn: PropTypes.bool.isRequired,
  onSubmitCreate: PropTypes.func.isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    createError: state.security.createError,
    creating: state.security.creating,
    loggingError: state.security.loggingError,
    loggingIn: state.security.loggingIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitCreate: (family) => dispatch(create(family)),
    onSubmitLogin: (loginRequest) => dispatch(login(loginRequest)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
