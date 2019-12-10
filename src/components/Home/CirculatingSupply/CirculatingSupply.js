import React from 'react';
import styled from 'styled-components';
import { Card, FlexColumnSpaceBetween } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';
import { formatCurrency } from '../../../utils';
import { BarLegend } from '../../Charts';

const CirculatingSupply = () => {
  const [chain] = useGlobal('chain');

  let settings = getBarSettings(chain);

  return (
    <Wrapper>
      <Card title={`Supply Breakdown for ${formatCurrency(chain.supply.total, '.5s')}`}>
        <FlexColumnSpaceBetween>
          <HorizontalProgressBar settings={settings} />
          <BarLegend settings={settings} />
        </FlexColumnSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
  display: flex;
`;
export default CirculatingSupply;

function getBarSettings(chain) {
  const s = chain.supply;
  let liquid = s.total - s.unvested - s.unclaimed - s.frozen;
  return [
    {
      percent: (liquid / chain.supply.total) * 100,
      color: '#3e85f2',
      title: 'Liquid',
      value: liquid,
    },
    {
      percent: (chain.supply.unvested / chain.supply.total) * 100,
      color: '#4672b9',
      title: 'Unvested',
      value: chain.supply.unvested,
    },
    {
      percent: (chain.supply.frozen / chain.supply.total) * 100,
      color: '#49679b',
      title: 'Frozen',
      value: chain.supply.frozen,
    },
    {
      percent: (chain.supply.unclaimed / chain.supply.total) * 100,
      color: '#30313b',
      title: 'Unclaimed',
      value: chain.supply.unclaimed,
    },
  ];
}
