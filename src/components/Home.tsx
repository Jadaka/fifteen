import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

import AuthControlContainer from '../containers/AuthButtonContainer';

const Home_ = styled.div``;

const Home:StatelessComponent = () => {
  return (
    <Home_>
      <AuthControlContainer/>
    </Home_>
  )
};

export default Home;
