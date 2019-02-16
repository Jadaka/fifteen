import React, { Component } from 'react';
import { RouteProps } from 'react-router-dom';
import styled from 'styled-components';

import Auth from '../services/Auth';

const AuthCallback_ = styled.div``;

class AuthCallback extends Component<RouteProps> {
  auth: Auth = new Auth();

  handleAuthentication() {
    const { location } = this.props;
    if (location && /access_token|id_token|error/.test(location.hash)) {
      this.auth.handleAuthentication();
    }
  }

  componentDidMount() {
    this.handleAuthentication();
  }

  render() {
    return (
      <AuthCallback_>
        Loading...
      </AuthCallback_>
    )
  }
};

export default AuthCallback;
