import React, { Component } from 'react';
import styled from 'styled-components';

import TilesContainer from '../containers/TilesContainer';

class App extends Component {
  render() {
    return (
      <div className="game">
        <TilesContainer />
      </div>
    );
  }
}

export default App;
