import React, { StatelessComponent, MouseEvent } from 'react';
import styled from 'styled-components';

const Button_ = styled.button`

`;

interface Props {
  isAuthenticated: boolean
  onAuthControlClick: (event: MouseEvent) => void
}

const AuthControl:StatelessComponent<Props> = ({
  isAuthenticated,
  onAuthControlClick,
}) => {
  return (
    <Button_ onClick={onAuthControlClick}>
      {isAuthenticated ? 'Logout' : 'Login'}
    </Button_>
  )
};

export default AuthControl;
