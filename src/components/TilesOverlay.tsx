import React, { StatelessComponent } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  started: boolean,
  height: number,
  width: number,
};

const TilesOverlay_ = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
`;

const TimerComponent:StatelessComponent<Props> = ({ started }) => (
  <TilesOverlay_ className="timer">
  </TilesOverlay_>
);

export default TimerComponent;
