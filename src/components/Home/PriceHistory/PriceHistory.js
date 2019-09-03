import React from 'react';
import PriceChart from './PriceChart';
import { Card, DataBox, FlexRow, FlexColumnSpaceBetween } from '../../Common';
import styled from 'styled-components';

const PriceHistory = ({ priceHistory }) => {
  const [currentValue] = React.useState(priceHistory[priceHistory.length - 1]);

  return (
    <Wrapper>
      <Card title={'Price History in US Dollars (30d)'}>
        <FlexRow>
          <PriceChart type={'svg'} data={priceHistory} />
          <FlexColumnSpaceBetween minWidth={100} ml={20}>
            <DataBox valueSize="14px" valueType="currency-usd" valueOpts={{dim:0,prec:2,digits:0}} title="Last Price" value={currentValue.close} />
            <DataBox valueSize="14px" valueType="currency-usd" valueOpts={{dim:0,prec:2,digits:0}} title="Open Price Today" value={currentValue.open} />
            <DataBox valueSize="14px" valueType="currency-usd" valueOpts={{dim:0,prec:2,digits:0}} title="Highest Price Today" value={currentValue.high} />
            <DataBox valueSize="14px" valueType="currency-usd" valueOpts={{dim:0,prec:2,digits:0}} title="Lowest Price Today" value={currentValue.low} />
          </FlexColumnSpaceBetween>
        </FlexRow>
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
