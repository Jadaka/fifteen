import React, { StatelessComponent, MouseEvent } from 'react';
import styled from 'styled-components';

import Button from './Button';

interface Props {
  isAuthenticated: boolean
  onClick: (event: MouseEvent) => void
}

const AuthButton_ = styled.div`
  margin: 20px 0;
`;

const AuthButton:StatelessComponent<Props> = ({
  isAuthenticated,
  onClick,
}) => (
  <AuthButton_>
    <Button onClick={onClick}>
      {isAuthenticated ? 'Logout' : 'Login'}
    </Button>
  </AuthButton_>
);

export default AuthButton;
