import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

const Timer_ = styled.div`
  align-items: center;
  border: 2px solid ${props => props.theme.hint};
  border-radius: 3px;
  display: flex;
  font-size: 20px;
  height: 50px;
  justify-content: center;
  margin: 20px 0;
  width: 50px;
`;

interface Props {
  value: string,
};

const Timer:StatelessComponent<Props> = ({ value }) => (
  <Timer_ className="timer">
    {value}
  </Timer_>
);

export default Timer;
