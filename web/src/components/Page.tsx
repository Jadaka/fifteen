import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Page_ = styled.div`
  height: 100%;
  background: ${props => props.theme.surface};
  color: ${props => props.theme.body};
`;

const Page: FunctionComponent = ({ children }) => (
  <Page_ className="page">
    {children}
  </Page_>
);

export default Page;
