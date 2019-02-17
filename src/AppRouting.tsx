import React, { Component, ClassicComponent } from 'react';
import { Router, Route, Switch, RouteProps } from 'react-router-dom';

import AuthCallback from './components/AuthCallback';
import Home from './components/Home';
import GameContainer from './containers/GameContainer';
import Page from './components/Page';
import history from './history';

class AppRouting extends Component {
  AuthCallbackPage = (routeProps: RouteProps) => (
    <Page>
      <AuthCallback {...routeProps} />
    </Page>
  )

  GamePage = (routeProps: RouteProps) => (
    <Page>
      <GameContainer {...routeProps} />
    </Page>
  )

  HomePage = (routeProps: RouteProps) => (
    <Page>
      <Home {...routeProps} />
    </Page>
  )

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/auth/callback" component={this.AuthCallbackPage} />
          <Route exact path="/game" component={this.GamePage} />
          <Route path="/" component={this.HomePage} />
        </Switch>
      </Router>
    )
  }
}

export default AppRouting;
