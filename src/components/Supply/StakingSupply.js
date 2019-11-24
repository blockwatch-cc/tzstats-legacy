import React from 'react';
import styled from 'styled-components';
import { Card, Legend } from '../Common';
import { HorizontalProgressBar } from '../Common/ProgressBar';
import { useGlobal } from 'reactn';
import { formatCurrency, fixPercent } from '../../utils';

const StakingSupply = () => {
  const [chain] = useGlobal('chain');

  const settings = fixPercent(getBarSettings(chain));

  return (
    <Wrapper>
      <Card title={`Staking Supply`}>
        <HorizontalProgressBar settings={settings} />
        <Legend settings={settings} />
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
`;

export default StakingSupply;

function getBarSettings(chain) {
  return [
    {
      percent: Math.round((chain.supply.delegated / chain.supply.total) * 100),
      color: '#19f3f9',
      title: 'Delegated',
      value: chain.supply.delegated,
    },
    {
      percent: Math.round(
        ((chain.supply.total - chain.supply.staking - chain.supply.inactive_staking - chain.supply.unclaimed) /
          chain.supply.total) *
          100
      ),
      color: '#2fb3bd',
      title: 'Undelegated',
      value: chain.supply.total - chain.supply.staking - chain.supply.inactive_staking - chain.supply.unclaimed,
    },
    {
      percent: Math.round((chain.supply.inactive_delegated / chain.supply.total) * 100) || 0.5,
      color: '#3a94a0',
      title: 'Inactive Delegated',
      value: chain.supply.inactive_delegated,
    },
    {
      percent:
        Math.round(((chain.supply.inactive_staking - chain.supply.inactive_delegated) / chain.supply.total) * 100) ||
        0.5,
      color: '#467583',
      title: 'Inactive Bonds',
      value: chain.supply.inactive_staking - chain.supply.inactive_delegated,
    },
    {
      percent: Math.round(((chain.supply.staking - chain.supply.delegated) / chain.supply.total) * 100),
      color: '#858999',
      title: 'Bonds',
      value: chain.supply.staking - chain.supply.delegated,
    },
    {
      percent: Math.round((chain.supply.unclaimed / chain.supply.total) * 100),
      color: '#30313b',
      title: 'Unclaimed',
      value: chain.supply.unclaimed,
    },
  ];
}
