import React from 'react';
import PriceChart from './PriceChart';
import { Card } from '../Common';
import styled from 'styled-components';

const PriceHistory = ({ data }) => {

  return (<Wrapper>
    <Card title={'Price History in US Dollars (30d)'}>
      <PriceChart type={'svg'} data={data} />
    </Card>
  </Wrapper>)
};
const Wrapper = styled.div`
  min-width: 340px;
  height:240px;
  flex:1.8
  margin: 0 5px;
`
export default PriceHistory;
