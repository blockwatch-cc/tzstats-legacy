import React from 'react';
import BalanceChart from './BalanceChart';
import { DataBox, FlexColumnSpaceAround, FlexRow, Card, FlexRowWrap, FlexRowSpaceBetween } from '../../../Common';
import { useGlobal } from 'reactn';
import styled from 'styled-components';

const DelegatorBalanceHistory = ({ account, balanceHistory }) => {
  const [lastMarketData] = useGlobal('lastMarketData');

  return (
    <Card title={'Balance History (30d)'}>
      <FlexRowWrap>
        <FlexRow flex={1} mb={10}>
          <BalanceChart type={'svg'} data={balanceHistory} />
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
              valueType="currency-usd-fixed"
              title="Value"
              value={account.spendable_balance * lastMarketData.price}
            />
            {/* <DataBox valueType="text" title="Pending Earnings" value="N/A" /> */}
          </FlexColumnSpaceAround>
        </FlexRowSpaceBetween>
      </FlexRowWrap>
    </Card>
  );
};

export default DelegatorBalanceHistory;
