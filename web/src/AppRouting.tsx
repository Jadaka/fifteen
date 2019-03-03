import React, { Component, ClassicComponent } from 'react';
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom';

import GameContainer from './containers/GameContainer';
import Authenticated from './components/Authenticated';
import AuthCallback from './components/AuthCallback';
import Home from './components/Home';
import Page from './components/Page';
import history from './history';
import Dashboard from './components/Dashboard';

class AppRouting extends Component {
  AuthCallbackPage = (routeProps: RouteComponentProps) => (
    <Page>
      <AuthCallback {...routeProps} />
    </Page>
  )

  GamePage = (routeProps: RouteComponentProps) => (
    <Authenticated redirectTo="/">
      <Page>
        <GameContainer {...routeProps} />
      </Page>
    </Authenticated>
  )

  HomePage = (routeProps: RouteComponentProps) => (
    <Page>
      <Home {...routeProps} />
    </Page>
  )

  DashboardPage = (routeProps: RouteComponentProps) => (
    <Authenticated redirectTo="/">
      <Page>
        <Dashboard {...routeProps} />
      </Page>
    </Authenticated>
  )

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/auth/callback" component={this.AuthCallbackPage} />
          <Route exact path="/game" component={this.GamePage} />
          <Route exact path="/dashboard" component={this.DashboardPage} />
          <Route path="/" component={this.HomePage} />
        </Switch>
      </Router>
    )
  }
}

export default AppRouting;
