import React, { Component, ComponentType, FunctionComponent, ReactNode, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../services/Auth';
import { getService, ServiceName } from '../services';

interface Props {
  redirectTo: string,
}

interface State {
  authChecked: boolean,
}

class Authenticated extends Component<Props, State> {
  private auth: Auth = getService(ServiceName.AUTH) as Auth;

  componentDidMount() {
    if (!this.auth.isAuthenticated() && this.auth.isPreviouslyLoggedIn()) {
      this.auth.renewSession(() => {
        this.forceUpdate();
      });
    }
  }

  render() {
    const { children, redirectTo } = this.props;

    if (this.auth.isAuthenticated()) {
      return React.Children.only(children) as ReactElement<any>;
    }

    if (this.auth.isPreviouslyLoggedIn()) {
      return <div>Loading...</div>
    }

    return <Redirect to={redirectTo} />;
  }
}

export default Authenticated;
