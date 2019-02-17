import React, { StatelessComponent, MouseEvent, ReactChild } from 'react';
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
  font-size: 14px;
  padding: 6px 12px;
`;

const Button:StatelessComponent<Props> = ({ children, onClick }) => (
  <Button_ onClick={onClick}>
    {children}
  </Button_>
);

export default Button;
