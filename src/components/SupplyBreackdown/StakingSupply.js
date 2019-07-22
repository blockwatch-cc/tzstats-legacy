import React from 'react';
import styled from 'styled-components';
import { Card, Legend } from '../Common';
import ProgressBar from '../ProgressBarContainer';
import { useGlobal } from 'reactn';
import { formatCurrency, fixPercent } from '../../utils'

const StakingSupply = () => {
  const [supply] = useGlobal('supply');

  const settings = fixPercent(getBarSettings(supply));

  return (
    <Wrapper>
      <Card title={`Staking Supply`}>
        <ProgressBar settings={settings} />
        <Legend settings={settings} />
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;

export default StakingSupply;

function getBarSettings(supply) {
  return [
    {
      percent: Math.round((supply.delegated / supply.total) * 100),
      color: '#19f3f9',
      title: 'Delegated',
      value: supply.delegated,
    },
    {
      percent: Math.round(((supply.total - supply.staking - supply.inactive_staking - supply.unclaimed) / supply.total) * 100),
      color: '#2fb3bd',
      title: 'Undelegated',
      value: (supply.total - supply.staking - supply.inactive_staking - supply.unclaimed),
    },
    {
      percent: Math.round((supply.inactive_delegated / supply.total) * 100) || 0.5,
      color: '#3a94a0',
      title: 'Inactive Delegated',
      value: supply.inactive_delegated,
    },
    {
      percent: Math.round(((supply.inactive_staking - supply.inactive_delegated) / supply.total) * 100) || 0.5,
      color: '#467583',
      title: 'Inactive Bonds',
      value: (supply.inactive_staking - supply.inactive_delegated),
    },
    {
      percent: Math.round(((supply.staking - supply.delegated) / supply.total) * 100),
      color: '#858999',
      title: 'Bonds',
      value: (supply.staking - supply.delegated),
    },
    {
      percent: Math.round((supply.unclaimed / supply.total) * 100),
      color: '#30313b',
      title: 'Unclaimed',
      value: supply.unclaimed,
    },
  ];
}

