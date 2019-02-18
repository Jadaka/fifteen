import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

import AuthControlContainer from '../containers/AuthButtonContainer';
import { RouteProps } from 'react-router';

const Home_ = styled.div``;

const Home:StatelessComponent<RouteProps> = () => {
  return (
    <Home_ className="home">
      <AuthControlContainer/>
    </Home_>
  )
};

export default Home;
