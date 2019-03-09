import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import AuthButton from '../components/AuthButton';
import Auth from '../services/Auth';
import Store from '../modules/Store';
import { getService, ServiceName } from '../services';

class AuthButtonContainer extends Component<RouteComponentProps> {
  auth: Auth = getService(ServiceName.AUTH) as Auth;
  store: Store = new Store();

  handleControlClick = (): void => {
    if (this.auth.isAuthenticated()) {
      this.auth.logout();
    } else {
      this.auth.login();
    }
  }

  componentDidMount(): void {
    const { location, history } = this.props;

    if (this.store.get('isLoggedIn')) {
      this.auth.renewSession(() => {
        history.replace(location.pathname);
      });
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

export default withRouter(AuthButtonContainer);
