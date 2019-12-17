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
import { formatValue, formatCurrency, getAccountTags, getAccountType } from '../../../utils';
// import { timeFormat } from 'd3-time-format';

const AccountInfo = ({ account }) => {
  const tags = getAccountTags(account);
  const accountType = getAccountType(account);

  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');
  const stakingCapacity = getStakingCapacity(account, chain, config);
  const settings = getStakingSettings(account.staking_balance, stakingCapacity);

  if (account.is_active_delegate && account.staking_balance >= stakingCapacity) {
    tags.push('Overdelegated');
  }

  return (
    <Wrapper>
      <Card title={<><Blockies hash={account.address} /><span>{accountType.name}</span></>} tags={tags} right={<CopyHashButton value={account.address} />}>
        <FlexRowSpaceBetween mt={10}>
          <FlexColumnSpaceBetween>
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
          <FlexColumnSpaceBetween>
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
          <FlexColumnSpaceBetween>
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
          <FlexColumnSpaceBetween>
            <DataBox
              valueType="text"
              title="Transactions / Operations"
              value={`${formatValue(account.n_tx)} / ${formatValue(account.n_ops)}`}
            />
            <DataBox valueType="currency-full" title="Total Burned" value={account.total_burned} />
          </FlexColumnSpaceBetween>
          {account.is_delegate ? (
            <FlexColumnSpaceBetween width={200} paddingTop={10}>
              <FlexRowSpaceBetween marginRight={-10}>
                <DataBox title="Active Delegations" value={account.active_delegations} />
                <DataBox title="Rolls Owned" ta="right" value={account.rolls} />
              </FlexRowSpaceBetween>
              <FlexColumn marginBottom={-10} marginRight={-10}>
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
            <FlexColumnSpaceBetween>
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
            <FlexColumnSpaceBetween />
          )}
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

// based on current rolls (updated each block)
function getStakingCapacity(account, chain, config) {
  const block_deposits = config.block_security_deposit + config.endorsement_security_deposit * config.endorsers_per_block;
  const network_bond = block_deposits * config.blocks_per_cycle * (config.preserved_cycles + 1);
  const network_stake = chain.rolls * config.tokens_per_roll;
  const total_balance = account.spendable_balance + account.frozen_deposits + account.frozen_fees;
  return total_balance / network_bond * network_stake;
}

// from https://github.com/blockwatch-cc/tzstats/issues/46
// function getStakingCapacity(account, chain, config) {
//   const block_deposit = config.block_security_deposit + config.endorsement_security_deposit * config.endorsers_per_block;
//   const adjusted_total = chain.supply.total - chain.supply.frozen_rewards;
//   const self_bond = block_deposit * config.blocks_per_cycle * (config.preserved_cycles + 1) / adjusted_total;
//   const staking_ratio = chain.supply.active_staking / adjusted_total;
//   const total_balance = account.spendable_balance + account.frozen_deposits + account.frozen_fees;
//   return total_balance / self_bond * staking_ratio;
// }

function getStakingSettings(stakingBalance, stakingCapacity) {
  stakingCapacity = stakingCapacity || 1;
  let stakingPct = Math.round((10000 * stakingBalance) / stakingCapacity) / 100;
  stakingPct = stakingPct > 100 ? 100 : stakingPct;
  return [
    {
      percent: stakingPct,
      color: stakingBalance>=stakingCapacity?'#ED6290':'#418BFD',
      title: 'Baker Funds + Delegated Coins',
      value: `${stakingBalance}`,
    },
    {
      percent: 100 - stakingPct,
      color: '#858999;',
      title: `Remaining Capacity ${formatCurrency(stakingCapacity-stakingBalance, ',', 'tz')}`,
      value: `${stakingCapacity}`,
    },
  ];
}

const Wrapper = styled.div`
  min-width: 300px;
  flex: 1.8;
`;

export default AccountInfo;
