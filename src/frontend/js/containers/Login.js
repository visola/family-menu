import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/Security';

class Login extends React.Component {
  onSubmit(e) {

  }

  render() {
    return <form className="login-form">
      <FormControl
        type="text"
        placeholder="Family Name" />
      <FormControl
        type="password"
        placeholder="Password" />
      <Button type="submit">Login or Create Account</Button>
    </form>;
  }
}

const mapDispatchToProps = (dispatch) => {
  onSubmit: (input) => dispatch(login())
}

export default connect(null, mapDispatchToProps)(Login);
