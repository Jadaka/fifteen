import React, { StatelessComponent } from 'react';
import styled, { keyframes } from 'styled-components';

const skRotatePlane = keyframes`
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ddd;

  -webkit-animation: ${skRotatePlane} 1.2s infinite ease-in-out;
  animation: ${skRotatePlane} 1.2s infinite ease-in-out;
`;

export default Spinner;
