import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowSpaceBetween } from '../Common';

const AccountBalance = props => {
  return (
    <AccountBalanceContainer>
      <Card title={'Balance'}>
        <ChartPanel>
          <DataBox valueType="currency-fixed" title="Spendable Balance" value={props.spendable_balance} />
          <FlexRowSpaceBetween>
            <DataBox
              valueType="currency-fixed"
              title="Total Balance"
              value={props.spendable_balance + props.frozen_deposits}
            />
            <DataBox
              valueType="currency-fixed"
              title="Pending Rewards"
              value={props.frozen_rewards + props.frozen_fees}
            />
          </FlexRowSpaceBetween>
        </ChartPanel>
      </Card>
    </AccountBalanceContainer>
  );
};

const AccountBalanceContainer = styled.div`
  flex: 1;
  padding: 0 5px;
`;
const ChartPanel = styled.div`
  width: 225px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default AccountBalance;
