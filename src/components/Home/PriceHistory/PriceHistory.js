import React from 'react';
import PriceChart from './PriceChart';
import { Card, FlexRow } from '../../Common';
import styled from 'styled-components';

const PriceHistory = ({ priceHistory }) => {
  return (
    <Wrapper>
      <Card title={'Tezos Price Last 30d'}>
        <FlexRow>
          <PriceChart type={'svg'} data={priceHistory} />
        </FlexRow>
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  margin: 0 5px;
`;
export default PriceHistory;
