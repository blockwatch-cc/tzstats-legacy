import React from 'react';
import BalanceChart from './BalanceChart';
import {
  DataBox,
  FlexColumnSpaceAround,
  FlexRow,
  Card,
  FlexRowWrap,
  FlexRowSpaceBetween,
  FlexColumn,
} from '../../../Common';
import { HorizontalProgressBar } from '../../../Common/ProgressBar';
import { useGlobal } from 'reactn';
import styled from 'styled-components';

const DelegationHistory = ({ account, stakingData }) => {
  const [chain] = useGlobal('chain');
  const stackingCapacity = getStakingCapacity(account, chain);
  const totalStaking =
    account.delegated_balance + account.delegated_balance + account.frozen_deposits + account.frozen_fees;

  let settings = getStakingSettings(totalStaking, stackingCapacity);

  return (
    <Card title={'Delegation History (30d)'}>
      <FlexRowWrap>
        <FlexRow flex={1} mb={10}>
          <BalanceChart type={'svg'} data={stakingData} />
        </FlexRow>
        <FlexRowSpaceBetween width={350} ml={30}>
          <FlexColumnSpaceAround minHeight={150}>
            <LegendItem color={'#29C0FF'}>
              <DataBox title="Delegated Balance" valueType={'currency-full'} value={account.delegated_balance} />
            </LegendItem>
            <div style={{ height: 75 }}></div>
          </FlexColumnSpaceAround>
          <FlexColumnSpaceAround width={175} minHeight={150}>
            <FlexRowSpaceBetween>
              <DataBox valueSize="14px" title="Active Delegations" value={account.active_delegations} />
              <DataBox valueSize="14px" title="Rolls Owned" value={chain.roll_owners} />
            </FlexRowSpaceBetween>
            <FlexColumn>
              <FlexRowSpaceBetween>
                <DataBox valueSize="14px" valueType="currency-short" value={totalStaking} />
                <DataBox valueSize="14px" valueType="currency-short" value={stackingCapacity} />
              </FlexRowSpaceBetween>
              <HorizontalProgressBar height={10} settings={settings} />
              <FlexRowSpaceBetween>
                <DataBox title="Staking Balance" />
                <DataBox title="Staking Capacity" />
              </FlexRowSpaceBetween>
            </FlexColumn>
          </FlexColumnSpaceAround>
        </FlexRowSpaceBetween>
      </FlexRowWrap>
    </Card>
  );
};
function getStakingCapacity(account, chain) {
  return (
    ((account.spendable_balance + account.frozen_deposits) / ((2560 * 4096 * 5) / chain.supply.total)) *
    ((chain.rolls * 8000) / chain.supply.total)
  );
}
function getStakingSettings(totalStaking, stackingCapacity) {
  return [
    {
      percent: (100 * totalStaking) / (totalStaking + stackingCapacity),
      color: '#418BFD',
      title: 'In Staking',
      value: `${totalStaking}`,
    },
    {
      percent: (100 * stackingCapacity) / (totalStaking + stackingCapacity),
      color: '#858999;',
      title: 'Staking Capacity',
      value: `${stackingCapacity}`,
    },
  ];
}
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

export default DelegationHistory;
