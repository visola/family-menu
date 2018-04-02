import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

@inject('security')
@observer
export default class LoginForm extends React.Component {
  static propTypes = {
    security: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, field) {
    this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.security.login(this.state);
  }

  render() {
    const { security } = this.props;
    const canSubmit = this.state.name.length > 3 && this.state.password.length > 2;
    return <form className="login-form" onSubmit={this.handleSubmit}>
      <FormControl
        disabled={security.loggingIn}
        type="text"
        onChange={e => this.handleChange(e, 'name')}
        placeholder="Family Name or Email"
        value={this.state.name} />
      <FormControl
        disabled={security.loggingIn}
        type="password"
        onChange={e => this.handleChange(e, 'password')}
        placeholder="Password"
        value={this.state.password} />
      <Button disabled={security.loggingIn || !canSubmit} type="submit">Login</Button>
      {this.renderStatus()}
    </form>;
  }

  renderStatus() {
    const { security } = this.props;
    if (security.loginError) {
      return <p className="text-danger">{security.loginError}</p>;
    } else if (security.loggingIn) {
      return <p>Logging in...</p>;
    }
    return null;
  }
}
