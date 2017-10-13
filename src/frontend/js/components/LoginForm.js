import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import PropTypes from 'prop-types';
import React from 'react';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', password: '', confirmPassword: '' };
  }

  onChange(e, field) {
    this.setState({ [field]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const canSubmit = this.state.name.length > 3 && this.state.password.length > 2;
    return <form className="login-form" onSubmit={this.onSubmit.bind(this)}>
      <FormControl
        disabled={this.props.loggingIn}
        type="text"
        onChange={e => this.onChange(e, 'name')}
        placeholder="Family Name or Email"
        value={this.state.name} />
      <FormControl
        disabled={this.props.loggingIn}
        type="password"
        onChange={e => this.onChange(e, 'password')}
        placeholder="Password"
        value={this.state.password} />
      <Button disabled={this.props.loggingIn || !canSubmit} type="submit">Login</Button>
      {this.renderStatus()}
    </form>;
  }

  renderStatus() {
    if (this.props.loggingError) {
      return <p className="text-danger">{this.props.loggingError}</p>;
    } else if (this.props.loggingIn) {
      return <p>Logging in...</p>;
    }
    return null;
  }
}

Login.propTypes = {
  loggingError: PropTypes.string,
  loggingIn: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
