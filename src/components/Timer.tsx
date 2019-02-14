import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

const Timer_ = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  height: 100px;
  justify-content: center;
  width: 100px;
`;

type Props = {
  count: number,
};

const TimerComponent:StatelessComponent<Props> = ({ count }) => (
  <Timer_ className="timer">
    {count}
  </Timer_>
);

export default TimerComponent;
