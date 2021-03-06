import React, { Component, FunctionComponent } from 'react';
import styled from 'styled-components';

import { Rows, Row, Tile } from '../modules/Game';

const Tiles_ = styled.div`
  background: ${props => props.theme.hairline};
  padding: 1px;
`;

const Row_ = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Tile_ = styled.div`
  align-items: center;
  background: ${props => props.theme.surface};
  display: flex;
  font-size: 32px;
  height: 100px;
  justify-content: center;
  margin: 1px;
  width: 100px;
`;

interface Props {
  rows: Rows,
};

const TilesComponent:FunctionComponent<Props> = (props) => (
  <Tiles_ className="rows">
    {props.rows.map((row: Row, rowIndex:number) => (
      <Row_ className="row" key={`row-${rowIndex}`}>
        {row.map((cellValue: Tile, colIndex:number) => {
          const id = `tile-${rowIndex}-${colIndex}`;
          return (
            <Tile_ className="col" id={id} key={id}>
              {cellValue > 0 ? cellValue : ''}
            </Tile_>
          );
        })}
      </Row_>
    ))}
  </Tiles_>
);

export default TilesComponent;
