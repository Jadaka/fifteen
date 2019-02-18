import React, { Component } from 'react';

import AuthButton from '../components/AuthButton';
import Auth from '../services/Auth';
import Store from '../modules/Store';

class AuthButtonContainer extends Component {
  auth: Auth = new Auth();
  store: Store = new Store();

  handleControlClick = (): void => {
    if (this.auth.isAuthenticated()) {
      this.auth.logout();
    } else {
      this.auth.login();
    }
  }

  componentDidMount(): void {
    if (this.store.get('isLoggedIn')) {
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
