import React, { StatelessComponent } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  started: boolean,
  ended: boolean,
};

const TilesOverlay_ = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  display: ${(props: Props) => props.started && !props.ended ? 'none' : 'flex'};
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Message_ = styled.div`
  color: #fff;
  font-size: 28px;
`;

const TimerComponent:StatelessComponent<Props> = (props) => {
  const { ended } = props;
  const message = ended ? 'Nice!' : 'Press Space to Start.';

  return (
    <TilesOverlay_ className="timer" {...props}>
      <Message_>
        {message}
      </Message_>
    </TilesOverlay_>
  );
};

export default TimerComponent;
