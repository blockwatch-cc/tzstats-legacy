import React from 'react';
import styled from 'styled-components';

const NoDataFound = () => {
  return <Wrapper>No data found</Wrapper>;
};
const Wrapper = styled.div`
  margin: 75px auto;
  width: 125px;
  color: rgba(255, 255, 255, 0.52);
`;

export default NoDataFound;
