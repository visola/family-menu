import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import Family from '../models/Family';

@inject('security')
@observer
export default class CreateFamilyForm extends React.Component {
  static propTypes = {
    security: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      confirmPassword: '',
      family: new Family(),
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeFamily(e, field) {
    this.state.family.model[field] = e.target.value;
  }

  onChangeState(e, field) {
    this.setState({ [field]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    const loginRequest = {
      name: this.state.family.model.name,
      password: this.state.password,
    };

    this.state.family
      .save({password: this.state.password})
      .then(() => this.props.security.login(loginRequest));
  }

  render() {
    const { confirmPassword, family, password } = this.state;
    const { saving } = family;
    const { email, name } = family.model;

    const canSubmit = name.length > 3
      && email.length > 5
      && password.length > 2
      && confirmPassword.length > 2;

    return <form className="create" onSubmit={this.onSubmit}>
      <FormControl
        disabled={saving}
        type="text"
        onChange={e => this.onChangeFamily(e, 'name')}
        placeholder="Family Name"
        value={name} />
      <FormControl
        disabled={saving}
        type="email"
        onChange={e => this.onChangeFamily(e, 'email')}
        placeholder="Email Address"
        value={email} />
      <FormControl
        disabled={saving}
        type="password"
        onChange={e => this.onChangeState(e, 'password')}
        placeholder="Password"
        value={password} />
        <FormControl
          disabled={saving}
          type="password"
          onChange={e => this.onChangeState(e, 'confirmPassword')}
          placeholder="Confirm Password"
          value={confirmPassword} />
      <Button disabled={saving || !canSubmit} type="submit">Create</Button>
      {this.renderStatus()}
    </form>;
  }

  renderStatus() {
    const { confirmPassword, family, password } = this.state;
    const { error, saving } = family;

    if (password !== confirmPassword) {
      return <p className="text-danger">Confirm password does not match password.</p>;
    } else if (error) {
      return <p className="text-danger">{error}</p>;
    } else if (saving) {
      return <p>Creating your family...</p>;
    }
    return null;
  }
}
