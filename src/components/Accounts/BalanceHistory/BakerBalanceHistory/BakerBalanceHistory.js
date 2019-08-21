import React from 'react';
import BalanceChart from '../DelegationHistory/BalanceChart';
import { DataBox, FlexRowSpaceBetween, FlexRow, Card, FlexRowWrap, FlexColumnSpaceBetween } from '../../../Common';
import styled from 'styled-components';
import { useGlobal } from 'reactn';
import _ from 'lodash';

const BakerBalanceHistory = ({ account, balanceHistory, stakingData }) => {
  const [lastMarketData] = useGlobal('lastMarketData');
  const avgRewards = _.sumBy(stakingData, d => d.reward) / stakingData.length;

  return (
    <Card title={'Balance History (30d)'}>
      <FlexRowWrap>
        <FlexRow flex={1} mb={10}>
          <BalanceChart type={'svg'} data={balanceHistory} />
        </FlexRow>
        <FlexRowSpaceBetween width={350} ml={30}>
          <FlexColumnSpaceBetween minHeight={120}>
            <LegendItem color={'#17eef4'}>
              <DataBox
                valueType="currency-full"
                title="Spendable"
                value={parseFloat(account.spendable_balance.toFixed(2))}
              />
            </LegendItem>
            <LegendItem color={'#858999'}>
              <DataBox valueType="currency-full" title="Total" value={account.total_balance} />
            </LegendItem>
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={120}>
            <DataBox
              valueType="currency-usd-fixed"
              title="Value"
              valueSize="14px"
              value={account.spendable_balance * lastMarketData.price}
            />
            <DataBox
              valueType="currency-full"
              valueSize="14px"
              title="Pending Rewards"
              value={account.frozen_rewards + account.frozen_fees}
            />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={120}>
            <div style={{ height: 40 }}></div>
            <DataBox valueType="currency-short" valueSize="14px" title="Daily Rewards" value={avgRewards} />
          </FlexColumnSpaceBetween>
        </FlexRowSpaceBetween>
      </FlexRowWrap>
    </Card>
  );
};

const LegendItem = styled.div`
  margin-bottom: -28px;
  margin-left: 20px;
  white-space: nowrap;
  min-width: 130px;
  &:after {
    content: '•';
    position: relative;
    left: -20px;
    bottom: 45px;
    font-size: 30px;
    color: ${prop => prop.color};
  }
`;

export default BakerBalanceHistory;
