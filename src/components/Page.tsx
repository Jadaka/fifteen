import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

const Page_ = styled.div`
  height: 100%;
`;

const Page: StatelessComponent = ({ children }) => (
  <Page_ className="page">
    {children}
  </Page_>
);

export default Page;
