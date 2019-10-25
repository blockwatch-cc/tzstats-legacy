import React from 'react';
import styled from 'styled-components';
import { Centered } from '.';

const NotFound = ({ reloadFunc, type, hash }) => {
  return (
    <Centered>
      <H1>{type}</H1>
      <H2>{hash}</H2>
      <Dim>{`This ${type} has not been included into the Tezos blockchain yet.`}</Dim>
      <Button onClick={e => reloadFunc()}>Reload</Button>
    </Centered>
  );
};

const H1 = styled.div`
	color: rgba(255, 255, 255, 0.25);
	font-size: 1.2em;
	margin: 10px;
	text-transform: capitalize;
`;

const Dim = styled.div`
	color: rgba(255, 255, 255, 0.25);
	font-size: 1.2rem;
`;

const H2 = styled.div`
	color: rgba(255, 255, 255, 0.52);
	font-size: 1.5em;
	margin-bottom: 20px;
`;

const Button = styled.button`
    border: 0 none;
    background-color: #3d404d;
    color: #ccc;
    cursor: pointer;
    margin: 2em;
  	padding: 1em 2em;
  	font-size: 14px;
    &:hover{
    	color: #fff;
    	background-color: #404252;
    }
    &:active{
    	color: #fff;
    	background-color: #3b3d4d;
    }
`;

export default NotFound;
