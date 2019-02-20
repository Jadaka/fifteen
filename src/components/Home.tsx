import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import AuthControlContainer from '../containers/AuthButtonContainer';
import { RouteComponentProps } from 'react-router';

const Home_ = styled.div``;

const Home:FunctionComponent<RouteComponentProps> = () => {
  return (
    <Home_ className="home">
      <AuthControlContainer/>
    </Home_>
  )
};

export default Home;
