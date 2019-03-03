import React, { FunctionComponent, MouseEvent, ReactChild } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactChild,
  onClick: (arg0: MouseEvent) => void;
}

const Button_ = styled.button`
  background: ${props => props.theme.primary};
  border: 0px;
  border-radius: 3px;
  color: ${props => props.theme.surface};
  cursor: pointer;
  font-size: 14px;
  padding: 6px 12px;
`;

const Button:FunctionComponent<Props> = ({ children, onClick }) => (
  <Button_ onClick={onClick}>
    {children}
  </Button_>
);

export default Button;
