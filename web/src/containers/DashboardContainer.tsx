import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Api from '../services/Api';
import { getService, ServiceName } from '../services';

class DashboardContainer extends Component<RouteComponentProps> {
  api: Api = getService(ServiceName.API) as Api;

  componentDidMount() {
    setTimeout(() => {
      this.api.requestWithAuth('get', '/leaderboard')
        .then(resp => {
          console.log('resp = ', resp);
        })
        .catch(err => {
          console.log('err = ', err);
        });
    }, 2000);
  }

  render() {
    return (
      <Dashboard {...this.props}></Dashboard>
    );
  }
}

export default DashboardContainer;
