import React from 'react';

import CreateFamilyForm from '../components/CreateFamilyForm';
import LoginForm from '../components/LoginForm';

export default class LoginPage extends React.Component {
  render() {
    return <div className="login-page">
       <LoginForm />
       <hr />
       <p>Or create a new family to get started</p>
       <CreateFamilyForm />
     </div>;
  }
}
