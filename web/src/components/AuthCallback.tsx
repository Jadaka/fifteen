import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import Auth from '../services/Auth';
import Spinner from './Spinner';
import { getService, ServiceName } from '../services';

const AuthCallback_ = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
`;

class AuthCallback extends Component<RouteComponentProps> {
  auth: Auth = getService(ServiceName.AUTH) as Auth;

  handleAuthentication() {
    const { location, history } = this.props;
    if (location && /access_token|id_token|error/.test(location.hash)) {
      this.auth.handleAuthentication(() => {
        history.replace('/dashboard');
      });
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
