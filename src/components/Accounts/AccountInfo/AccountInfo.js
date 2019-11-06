import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import {
  Card,
  DataBox,
  HashedBox,
  FlexColumn,
  FlexRowSpaceBetween,
  FlexColumnSpaceBetween,
  CopyHashButton,
  Blockies
} from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { formatValue, getAccountTags, getAccountType } from '../../../utils';
// import { timeFormat } from 'd3-time-format';

const AccountInfo = ({ account }) => {
  const tags = getAccountTags(account);
  const accountType = getAccountType(account);

  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');
  const stakingCapacity = getStakingCapacity(account, chain, config);
  const settings = getStakingSettings(account.staking_balance, stakingCapacity);

  return (
    <Wrapper>
      <Card title={<><Blockies hash={account.address} /><span>{accountType.name}</span></>} tags={tags} right={<CopyHashButton value={account.address} />}>
        <FlexRowSpaceBetween mt={10} alignItems='flex-start'>
          <FlexColumnSpaceBetween minHeight={80}>
            <DataBox
              valueType="currency-full"
              title="Total Balance"
              value={account.total_balance + account.unclaimed_balance}
            />
            <DataBox
              title="Last Active"
              valueType="datetime"
              value={account.last_seen_time}
            />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={80}>
            <DataBox
              valueType="currency-full"
              title="Spendable Balance"
              value={account.spendable_balance}
            />
            <DataBox
              title="Creation Date"
              valueType="date"
              value={account.first_seen_time}
            />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={80}>
            <DataBox
              title="Rank"
              valueType="text"
              value={account.rich_rank ? formatValue(account.rich_rank) : '-'}
            />
            <DataBox
              valueType="currency-full"
              title="Total Fees Paid"
              value={account.total_fees_paid}
            />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={80}>
            <DataBox
              valueType="text"
              title="Transactions / Operations"
              value={`${formatValue(account.n_tx)} / ${formatValue(account.n_ops)}`}
            />
            <DataBox valueType="currency-full" title="Total Burned" value={account.total_burned} />
          </FlexColumnSpaceBetween>
          {account.is_delegate ? (
            <FlexColumnSpaceBetween width={200} minHeight={90}>
              <FlexRowSpaceBetween>
                <DataBox title="Active Delegations" value={account.active_delegations} />
                <DataBox title="Rolls Owned" ta="right" value={account.rolls} />
              </FlexRowSpaceBetween>
              <FlexColumn>
                <FlexRowSpaceBetween>
                  <DataBox
                    valueType="currency"
                    valueOpts={{ round: 1, digits: 0 }}
                    value={account.staking_balance}
                  />
                  <DataBox
                    valueType="currency"
                    valueOpts={{ round: 1, digits: 0 }}
                    value={stakingCapacity}
                  />
                </FlexRowSpaceBetween>
                <HorizontalProgressBar height={10} settings={settings} />
                <FlexRowSpaceBetween>
                  <DataBox title="Staking Balance" />
                  <DataBox title="Staking Capacity" />
                </FlexRowSpaceBetween>
              </FlexColumn>
            </FlexColumnSpaceBetween>
          ) : (account.is_delegated || account.is_contract) ? (
            <FlexColumnSpaceBetween minHeight={80}>
              {account.delegate && !account.is_delegate ? (
                <HashedBox hash={account.delegate} isCopy={false} typeName={`Current Delegate`} />
              ) : (
                <DataBox title="Current Delegate" valueType="text" value="-"/>
              )}
              {account.manager ? (
                <HashedBox hash={account.manager} isCopy={false} typeName={`Manager`} />
              ) : (
                <div>&nbsp;</div>
              )}
            </FlexColumnSpaceBetween>
          ) : (
            <FlexColumnSpaceBetween minHeight={80} />
          )}
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

function getStakingCapacity(account, chain, config) {
  const oneroll = config.tokens_per_roll;
  const deposits = config.block_security_deposit + config.endorsement_security_deposit * config.endorsers_per_block;
  return (
    ((account.spendable_balance + account.frozen_deposits) * chain.rolls * oneroll) /
    (deposits * config.blocks_per_cycle * config.preserved_cycles)
  );
}
function getStakingSettings(stakingBalance, stakingCapacity) {
  stakingCapacity = stakingCapacity || 1;
  let stakingPct = Math.round((10000 * stakingBalance) / stakingCapacity) / 100;
  stakingPct = stakingPct > 100 ? 100 : stakingPct;
  return [
    {
      percent: stakingPct,
      color: '#418BFD',
      title: 'In Staking',
      value: `${stakingBalance}`,
    },
    {
      percent: 100 - stakingPct,
      color: '#858999;',
      title: 'Staking Capacity',
      value: `${stakingCapacity}`,
    },
  ];
}

const Wrapper = styled.div`
  min-width: 340px;
  flex: 1.8;
`;

export default AccountInfo;
