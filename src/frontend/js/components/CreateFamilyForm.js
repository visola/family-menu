import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import PropTypes from 'prop-types';
import React from 'react';


class CreateFamilyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
    };
  }

  onChange(e, field) {
    this.setState({ [field]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const canSubmit = this.state.name.length > 3
      && this.state.email.length > 5
      && this.state.password.length > 2
      && this.state.confirmPassword.length > 2;
    return <form className="create" onSubmit={this.onSubmit.bind(this)}>
      <FormControl
        disabled={this.props.creating}
        type="text"
        onChange={e => this.onChange(e, 'name')}
        placeholder="Family Name"
        value={this.state.name} />
      <FormControl
        disabled={this.props.creating}
        type="email"
        onChange={e => this.onChange(e, 'email')}
        placeholder="Email Address"
        value={this.state.email} />
      <FormControl
        disabled={this.props.creating}
        type="password"
        onChange={e => this.onChange(e, 'password')}
        placeholder="Password"
        value={this.state.password} />
        <FormControl
          disabled={this.props.creating}
          type="password"
          onChange={e => this.onChange(e, 'confirmPassword')}
          placeholder="Confirm Password"
          value={this.state.confirmPassword} />
      <Button disabled={this.props.creating || !canSubmit} type="submit">Create</Button>
      {this.renderStatus()}
    </form>;
  }

  renderStatus() {
    if (this.state.password !== this.state.confirmPassword) {
      return <p className="text-danger">Confirm password does not match password.</p>;
    } else if (this.props.createError) {
      return <p className="text-danger">{this.props.createError}</p>;
    } else if (this.props.creating) {
      return <p>Creating your family...</p>;
    }
    return null;
  }
}

CreateFamilyForm.propTypes = {
  createError: PropTypes.string,
  creating: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateFamilyForm;
