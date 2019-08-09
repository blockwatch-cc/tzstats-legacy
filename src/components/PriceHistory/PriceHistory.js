import React from 'react';
import PriceChart from './PriceChart';
import { Card } from '../Common';
import styled from 'styled-components';

const PriceHistory = ({ priceHistory }) => {

  return (<Wrapper>
    <Card title={'Price History in US Dollars (30d)'}>
      <div style={{ width: "100%" }} >
        <PriceChart type={'svg'} data={priceHistory} />
      </div>
    </Card>
  </Wrapper>)
};
const Wrapper = styled.div`
  min-width: 340px;
  flex:1.8
  margin: 0 5px;
`
export default PriceHistory;
