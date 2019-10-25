import React from 'react';
import styled from 'styled-components';
import { Centered } from '.';

const Error = ({ err }) => {
  return (
    <Centered>
      <H1>Error</H1>
      <Dim>{err.detail}.</Dim>
    </Centered>
  );
};

const H1 = styled.div`
	color: rgba(255, 255, 255, 0.52);
	font-size: 1.5em;
	margin: 10px;
`;

const Dim = styled.div`
	color: rgba(255, 255, 255, 0.25);
	font-size: 1.2rem;
  text-transform: capitalize;
`;

export default Error;
