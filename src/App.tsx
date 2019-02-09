import React, { Component } from 'react';
import styled from 'styled-components';

import Game from './Components/Game';

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

class App extends Component {
  render() {
    return (
      <AppContainer className="App">
        <Game />
      </AppContainer>
    );
  }
}

export default App;
