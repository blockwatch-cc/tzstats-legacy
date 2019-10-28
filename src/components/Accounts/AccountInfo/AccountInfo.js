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
} from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { formatValue, timeAgo, getAccountTags, getAccountType } from '../../../utils';
import { timeFormat } from 'd3-time-format';

const AccountInfo = ({ account }) => {
  const tags = getAccountTags(account);
  const accountType = getAccountType(account);

  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');
  const stakingCapacity = getStakingCapacity(account, chain, config);
  const settings = getStakingSettings(account.staking_balance, stakingCapacity);

  return (
    <Wrapper>
      <Card title={`${accountType.name}`} tags={tags} right={<CopyHashButton value={account.address} type="account" />}>
        <FlexRowSpaceBetween mt={10}>
          <FlexColumnSpaceBetween minHeight={100}>
            <HashedBox
              hash={account.address}
              isCopy={false}
              short={true}
              typeName={`Last active ${timeAgo.format(new Date(account.last_seen_time))}`}
            />
            <DataBox
              title="Creation Date"
              valueSize="14px"
              valueType="text"
              value={` ${timeFormat('%b %d, %Y')(new Date(account.first_seen_time))}`}
            />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox
              valueSize="14px"
              valueType="currency-full"
              title="Total Balance"
              value={account.total_balance + account.unclaimed_balance}
            />
            <DataBox
              valueSize="14px"
              valueType="currency-full"
              title="Spendable Balance"
              value={account.spendable_balance}
            />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox
              valueSize="14px"
              title="Rank"
              valueType="text"
              value={account.rich_rank ? formatValue(account.rich_rank) : '-'}
            />
            <DataBox
              valueSize="14px"
              valueType="text"
              title="Transactions / Operations"
              value={`${formatValue(account.n_tx)} / ${formatValue(account.n_ops)}`}
            />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox
              valueSize="14px"
              valueType="currency-full"
              title="Total Fees Paid"
              value={account.total_fees_paid}
            />
            <DataBox valueSize="14px" valueType="currency-full" title="Total Burned" value={account.total_burned} />
          </FlexColumnSpaceBetween>
          {account.is_delegate ? (
            <FlexColumnSpaceBetween width={200} minHeight={100}>
              <FlexColumn>
                <FlexRowSpaceBetween>
                  <DataBox
                    valueSize="14px"
                    valueType="currency"
                    valueOpts={{ round: 1, digits: 0 }}
                    value={account.staking_balance}
                  />
                  <DataBox
                    valueSize="14px"
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
              <FlexRowSpaceBetween>
                <DataBox valueSize="14px" title="Active Delegations" value={account.active_delegations} />
                <DataBox valueSize="14px" title="Rolls Owned" ta="right" value={account.rolls} />
              </FlexRowSpaceBetween>
            </FlexColumnSpaceBetween>
          ) : (account.is_delegated || account.is_contract) ? (
            <FlexColumnSpaceBetween minHeight={100}>
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
            <FlexColumnSpaceBetween minHeight={100} />
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
