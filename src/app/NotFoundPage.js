import React from 'react';
import styled from 'styled-components';
import { Centered } from '../components/Common';

const NotFoundPage = ({ match }) => {
  const hash = match.params.value;

  return (
    <Centered>
      <H1>404</H1>
      {`We tried hard find ${hash ? hash : 'this page'}, but there is nothing here.`}
    </Centered>
  );
};

const H1 = styled.div`
	color: rgba(255, 255, 255, 0.25);
	font-size: 100px
	margin: 0 0 10px;
`;

export default NotFoundPage;
