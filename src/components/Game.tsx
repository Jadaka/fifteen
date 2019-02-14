import React, { Component, StatelessComponent } from 'react';
import styled from 'styled-components';

import { Rows, Row, Tile } from '../modules/Game';
import TilesComponent from './Tiles';
import TimerComponent from './Timer';
import TilesOverlay from './TilesOverlay';

const Game_ = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TilesWrapper_ = styled.div`
  position: relative;
`;

interface Props {
  started: boolean
  timerCount: number
  rows: Rows
}

const GameComponent:StatelessComponent<Props> = ({
    rows,
    started,
    timerCount}) => (
  <Game_ className="game">
    <TimerComponent count={timerCount} />
    <TilesWrapper_>
      <TilesComponent rows={rows} />
      <TilesOverlay started={started} height={406} width={406} />
    </TilesWrapper_>
  </Game_>
);

export default GameComponent;
