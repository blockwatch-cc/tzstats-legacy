import React from 'react';
import styled from 'styled-components';
import PriceHistory from '../../components/PriceHistory';
import VolumeHistory from '../../components/VolumeHistory';

const Home = props => {
  return (
    <Wrapper>
      <PriceHistory />
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const TwoElementsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 500px;
  justify-content: space-between;
  margin: 0 -5px;
`;
export default Home;
