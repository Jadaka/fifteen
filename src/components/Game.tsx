import React, { Component, StatelessComponent } from 'react';
import styled from 'styled-components';

import { Rows, Row, Tile } from '../modules/Game';
import TilesComponent from './Tiles';

const Game_ = styled.div`
  display: flex;
  align-items: center;
`;

type Props = {
  rows: Rows,
};

const GameComponent:StatelessComponent<Props> = ({ rows }: Props) => (
  <Game_>
    <TilesComponent rows={rows} />
  </Game_>
);

export default GameComponent;
