import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import AppRouting from './AppRouting';
import getTheme, { ThemeName } from './styles/theme';
import { Auth, Api, setService, ServiceName } from './services';

interface AppProps {}

class App extends Component {
  api: Api;
  auth: Auth;
  constructor(props: AppProps) {
    super(props);

    this.auth = new Auth();
    setService(ServiceName.AUTH, this.auth);
    this.api = new Api();
    setService(ServiceName.API, this.api);
  }

  render() {
    return (
      <ThemeProvider theme={getTheme(ThemeName.light)}>
        <AppRouting />
      </ThemeProvider>
    );
  }
}

export default App;
