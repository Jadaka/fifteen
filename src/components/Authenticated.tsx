import React, { ComponentType, FunctionComponent, ReactNode, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Auth from '../services/Auth';

interface Props {
  redirectTo: string,
}

let auth = new Auth();

const Authenticated:FunctionComponent<Props> = ({
  children,
  redirectTo,
}) => {
  if (!auth.isAuthenticated()) {
    return React.Children.only(children) as ReactElement<any>;
  }

  return <Redirect to={redirectTo} />;
};

export default Authenticated;
