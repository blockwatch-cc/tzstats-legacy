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
export default Home;
