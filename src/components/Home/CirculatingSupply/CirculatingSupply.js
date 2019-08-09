import React from 'react';
import styled from 'styled-components';
import { Card, Legend, FlexColumn } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';
import { formatCurrency, fixPercent } from '../../../utils';
const CirculatingSupply = () => {
  const [chain] = useGlobal('chain');

  let settings = getBarSettings(chain);

  return (
    <Wrapper>
      <Card title={`Supply Breakdown for ${formatCurrency(chain.supply.total, '.2s')}`}>
        <FlexColumn height={155} justifyContent="space-around">
          <HorizontalProgressBar settings={settings} />
          <Legend settings={settings} />
        </FlexColumn>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;
export default CirculatingSupply;

function getBarSettings(chain) {
  return [
    {
      percent: (chain.supply.circulating / chain.supply.total) * 100,
      color: '#3e85f2',
      title: 'Circulating',
      value: chain.supply.circulating,
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
