import React, { Component } from 'react';

import AuthControlComponent from '../components/AuthControl';
import Auth from '../services/Auth';

class AuthControlContainer extends Component {
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
      <AuthControlComponent
        isAuthenticated={this.auth.isAuthenticated()}
        onAuthControlClick={this.handleControlClick}
      />
    );
  }
}

export default AuthControlContainer;
