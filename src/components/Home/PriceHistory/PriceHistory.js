import React from 'react';
import PriceChart from './PriceChart';
import { Card, DataBox, FlexRow, FlexRowSpaceAround, FlexColumn, FlexRowSpaceBetween } from '../../Common';
import styled from 'styled-components';

const PriceHistory = ({ priceHistory }) => {
  const [currentValue, setCurrentValue] = React.useState(priceHistory[priceHistory.length - 1]);

  return (
    <Wrapper>
      <Card title={'Price History in US Dollars (30d)'}>
        <FlexRow>
          <PriceChart type={'svg'} data={priceHistory} setCurrentValue={setCurrentValue} />
        </FlexRow>
        <FlexRowSpaceBetween mt={20}>
          <DataBox valueSize="14px" valueType="currency-usd-fixed" title="High Price" value={currentValue.high} />
          <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Open Price" value={currentValue.open} />
          <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Close Price" value={currentValue.close} />
          <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Low Price" value={currentValue.low} />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 340px;
  flex: 2;
  margin: 0 5px;
`;
export default PriceHistory;
