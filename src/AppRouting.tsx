import React, { StatelessComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import AuthCallback from './components/AuthCallback';
import Home from './components/Home';
import GameContainer from './containers/GameContainer';
import history from './history';

interface Props {}

const AppRouting:StatelessComponent<Props> = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/auth/callback" component={AuthCallback} />
      <Route exact path="/game" component={GameContainer} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

export default AppRouting;
