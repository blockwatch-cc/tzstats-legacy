import React from 'react';
import BalanceChart from './BalanceChart';
import { DataBox, FlexColumnSpaceAround, FlexRow, Card, FlexRowWrap, FlexRowSpaceBetween } from '../../../Common';
import { useGlobal } from 'reactn';
import styled from 'styled-components';

const DelegatorBalanceHistory = ({ account, balance }) => {
  const [lastMarketData] = useGlobal('lastMarketData');

  return (
    <Wrapper>
    <Card title={'Balance Last 30d'}>
      <FlexRowWrap>
        <FlexRow flex={1} mb={10}>
          <BalanceChart type={'svg'} data={balance} />
        </FlexRow>
        <FlexRowSpaceBetween width={250} ml={30}>
          <FlexColumnSpaceAround minHeight={150}>
            <DataBox
              valueType="currency-full"
              title="Spendable"
              value={parseFloat(account.spendable_balance.toFixed(2))}
            />

            {/* <DataBox valueType="text" title="Stacking Earnings" value="N/A" /> */}
          </FlexColumnSpaceAround>
          <FlexColumnSpaceAround minHeight={150}>
            <DataBox
              valueType="currency-usd"
              valueOpts={{dim:0,prec:2}}
              title="Value"
              value={account.spendable_balance * lastMarketData.price}
            />
            {/* <DataBox valueType="text" title="Pending Earnings" value="N/A" /> */}
          </FlexColumnSpaceAround>
        </FlexRowSpaceBetween>
      </FlexRowWrap>
    </Card>
    </Wrapper>
  );
};

export default DelegatorBalanceHistory;

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
`;
