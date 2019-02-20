import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import AuthButtonContainer from '../containers/AuthButtonContainer';
import { Rows } from '../modules/Game';
import TilesComponent from './Tiles';
import TimerComponent from './Timer';
import TilesOverlay from './TilesOverlay';

const Game_ = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
`;

const TilesWrapper_ = styled.div`
  position: relative;
`;

interface Props {
  started: boolean
  ended: boolean
  timerCount: string
  rows: Rows
}

const Game:FunctionComponent<Props> = ({
  rows,
  started,
  ended,
  timerCount,
}) => (
  <Game_ className="game">
    <TimerComponent value={timerCount} />
    <TilesWrapper_>
      <TilesComponent rows={rows} />
      <TilesOverlay started={started} ended={ended} />
    </TilesWrapper_>
    <AuthButtonContainer />
  </Game_>
);

export default Game;
