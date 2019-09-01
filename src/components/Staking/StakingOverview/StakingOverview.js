import React from 'react';
import styled from 'styled-components';
import { Card, Legend, FlexColumnSpaceBetween, FlexRowSpaceBetween, DataBox } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';
import { formatCurrency, fixPercent } from '../../../utils';

const StakingOverview = () => {
  let settings = getBarSettings();

  return (
    <Wrapper>
      <Card title={`Staking Overview`}>
        <FlexColumnSpaceBetween minHeight={150}>
          <HorizontalProgressBar settings={settings} />
          <Legend settings={settings} />
          <FlexRowSpaceBetween>
            <DataBox valueType="percent" title="Staking Reward" value={0.5} />
            <DataBox valueType="percent" title="Reward From Fees" value={0.2} />
            <DataBox valueType="percent" title="Network Share" value={0.52} />
            <DataBox valueType="percent" title="Current Inflation" value={0.12} />
            <DataBox valueType="percent" title="Cumulative Staking Capacity" value={0.15} />
          </FlexRowSpaceBetween>
        </FlexColumnSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;

function getBarSettings() {
  return [
    {
      percent: 15,
      color: '#3e85f2',
      title: 'Delegated',
      value: 1515,
    },
    {
      percent: 20,
      color: '#4672b9',
      title: 'Undelegated',
      value: 7241,
    },
    {
      percent: 1,
      color: '#49679b',
      title: 'Inactive Delegated',
      value: 241,
    },
    {
      percent: 14,
      color: '#858999',
      title: 'Inactive Bonds ',
      value: 1411,
    },
    {
      percent: 25,
      color: '#646876',
      title: 'Bonds ',
      value: 111,
    },
    {
      percent: 25,
      color: '#262830',
      title: 'Unclaimed',
      value: 111,
    },
  ];
}

export default StakingOverview;
