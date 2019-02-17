import React, { Component } from 'react';
import { RouteProps } from 'react-router-dom';
import styled from 'styled-components';

import Auth from '../services/Auth';
import Spinner from './Spinner';

const AuthCallback_ = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
`;

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
        <Spinner />
      </AuthCallback_>
    )
  }
};

export default AuthCallback;
