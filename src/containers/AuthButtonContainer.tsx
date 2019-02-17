import React, { Component } from 'react';

import AuthButton from '../components/AuthButton';
import Auth from '../services/Auth';

class AuthButtonContainer extends Component {
  auth: Auth = new Auth();

  handleControlClick = (): void => {
    if (this.auth.isAuthenticated()) {
      this.auth.logout();
    } else {
      this.auth.login();
    }
  }

  componentDidMount(): void {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewSession();
    }
  }

  render() {
    return (
      <AuthButton
        isAuthenticated={this.auth.isAuthenticated()}
        onClick={this.handleControlClick}
      />
    );
  }
}

export default AuthButtonContainer;
