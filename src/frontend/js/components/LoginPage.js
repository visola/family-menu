import React from 'react';

import CreateFamilyForm from '../components/CreateFamilyForm';
import LoginForm from '../components/LoginForm';

export default class LoginPage extends React.Component {
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
