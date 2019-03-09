import React, { ComponentType, FunctionComponent, ReactNode, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Auth from '../services/Auth';
import { getService, ServiceName } from '../services';

interface Props {
  redirectTo: string,
}


const Authenticated:FunctionComponent<Props> = ({
  children,
  redirectTo,
}) => {
  const auth: Auth = getService(ServiceName.AUTH) as Auth;
  if (!auth.isAuthenticated()) {
    return React.Children.only(children) as ReactElement<any>;
  }

  return <Redirect to={redirectTo} />;
};

export default Authenticated;
