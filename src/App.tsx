import React, { Component } from 'react';

import AppRouting from './AppRouting';
import getTheme, { ThemeName } from './styles/theme';
import { ThemeProvider } from 'styled-components';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={getTheme(ThemeName.dark)}>
        <AppRouting />
      </ThemeProvider>
    );
  }
}

export default App;
