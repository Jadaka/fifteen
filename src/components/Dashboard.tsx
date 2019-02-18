import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

import AuthControlContainer from '../containers/AuthButtonContainer';
import { RouteProps } from 'react-router';

const Dashboard_ = styled.div`
  display: grid;
  grid-gap: 0 5%;
  grid-template-columns: 60% 35%;
  grid-template-areas:
    "header  header"
    "content sidebar"
    "footer  footer";
`;

const Header_ = styled.header`
  border-bottom: 4px solid ${props => props.theme.body};
  display: flex;
  grid-area: header;
  margin-bottom: 4px;
  padding: 0 45px;
  justify-content: space-between;
`;

const HeaderRight_ = styled.div`
  display: flex;
  align-items: center;
`;

const DashboardContent_ = styled.div`
  grid-area: content;
  padding-left: 45px;
`;

const DashboardSidebar_ = styled.div`
  grid-area: sidebar;
  padding-right: 45px;
`;

const DashboardFooter_ = styled.div`
  grid-area: footer;
  padding: 0 45px;
`;

const Dashboard:StatelessComponent<RouteProps> = () => {
  return (
    <Dashboard_ className="dashboard">
      <Header_ className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
        </div>
        <HeaderRight_>
          <AuthControlContainer/>
        </HeaderRight_>
      </Header_>
      <DashboardContent_ className="dashboard-content">
        <h1>Dashboard Contents goes here</h1>
      </DashboardContent_>
      <DashboardSidebar_ className="dashboard-sidebar">
        <h3>Sidebar stuff goes here</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, deserunt reprehenderit! Porro id officiis tempora eveniet alias nobis quisquam, optio est nostrum rerum? Doloremque pariatur, impedit amet dolorem natus aperiam!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, deserunt reprehenderit! Porro id officiis tempora eveniet alias nobis quisquam, optio est nostrum rerum? Doloremque pariatur, impedit amet dolorem natus aperiam!</p>
      </DashboardSidebar_>
      <DashboardFooter_ className="dashboard-footer">
        <h3>Footer stuff goes here</h3>
      </DashboardFooter_>
    </Dashboard_>
  )
};

export default Dashboard;
