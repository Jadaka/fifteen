import React, { Component, StatelessComponent } from 'react';
import styled from 'styled-components';

const Tiles_ = styled.div`
  background: #bbb;
  padding: 1px;
`;

const Row_ = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Column_ = styled.div`
  align-items: center;
  background: #fff;
  margin: 1px;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 100px;
`;

type Props = {
  tiles: Array<Array<number|null>>,
};

const Tiles:StatelessComponent<Props> = (props) => (
  <Tiles_ className="tiles">
    {props.tiles.map((row:Array<number|null>, rowIndex:number) => (
      <Row_
        className="row"
        key={`row-${rowIndex}`}
      >
        {row.map((cellValue:number|null, colIndex:number) => {
          const id = `tile-${rowIndex}-${colIndex}`;
          return (
            <Column_
              className="col"
              id={id}
              key={id}
            >
              {cellValue}
            </Column_>
          );
        })}
      </Row_>
    ))}
  </Tiles_>
);

export default Tiles;
