import React from 'react';
import styled from 'styled-components';
import { Card } from '../Common';
import { HorizontalProgressBar } from '../ProgressBar';
import StackingChart from './StakingChart';
import { useGlobal } from 'reactn';
import { DataBox, FlexColumn, FlexRow } from '../Common';

const StakingBond = ({ account, data }) => {
  const [chain] = useGlobal('chain');
  const stackingCapacity = getStakingCapacity(account, chain);
  let settings = getStakingSettings(account, stackingCapacity);

  return (
    <Card title={'Staking Bond (30d)'}>
      <Content>
        <StackingChart data={data} />
        <FlexColumn mt={18} px={20} justifyContent="space-between">
          <DataBox
            valueType="currency-fixed"
            title="Total Bond"
            value={account.spendable_balance + account.frozen_deposits}
          />
          <DataBox valueType="currency-fixed" title="Current Deposits" value={account.frozen_deposits} />
          <DataBox valueType="currency-fixed" title="Pending Rewards" value={account.frozen_rewards} />
        </FlexColumn>
        <FlexColumn justifyContent="space-between">
          <BorderBox style={{ minWidth: 250 }}>
            <FlexColumn>
              <DataBox title="Active Delegations" value={account.active_delegations} />
              <ProgressBarWrapper>
                <Details>
                  <DataBox valueType="currency-short" value={account.delegated_balance} />
                  <DataBox valueType="currency-short" value={stackingCapacity} />
                </Details>
                <HorizontalProgressBar settings={settings} />
                <Details>
                  <DataBox title="In Staking" />
                  <DataBox title="Staking Capacity" />
                </Details>
              </ProgressBarWrapper>
            </FlexColumn>
          </BorderBox>
          <FlexRow justifyContent="space-between">
            <DataBox valueType="currency-fixed" title="Frozen Fees" value={account.frozen_fees} />
          </FlexRow>
        </FlexColumn>
      </Content>
    </Card>
  );
};
const ProgressBarWrapper = styled.div`
  padding-top: 15px;
`;
const BorderBox = styled.div`
  border: 1px solid #6f727f;
  padding: 15px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default StakingBond;
function getStakingCapacity(account, chain) {
  return (
    ((account.spendable_balance + account.frozen_deposits) / ((2560 * 4096 * 5) / chain.supply.total)) *
    ((chain.rolls * 8000) / chain.supply.total)
  );
}

function getStakingSettings(account, stackingCapacity) {
  return [
    {
      percent: (account.delegated_balance / (account.delegated_balance + stackingCapacity)) * 100,
      color: '#418BFD',
      title: 'In Staking',
      value: `${account.delegated_balance}`,
    },
    {
      percent: (stackingCapacity / (account.delegated_balance + stackingCapacity)) * 100,
      color: '#858999;',
      title: 'Staking Capacity',
      value: `${stackingCapacity}`,
    },
  ];
}
