import React, { Component } from 'react';
import styled from 'styled-components';

import GameContainer from './containers/GameContainer';

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

class App extends Component {
  render() {
    return (
      <AppContainer className="App">
        <GameContainer />
      </AppContainer>
    );
  }
}

export default App;
