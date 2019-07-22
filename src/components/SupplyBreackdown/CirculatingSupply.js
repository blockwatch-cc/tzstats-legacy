import React from 'react';
import styled from 'styled-components';
import { Card, Legend } from '../Common';
import ProgressBar from '../ProgressBarContainer';
import { useGlobal } from 'reactn';
import { formatCurrency, fixPercent } from '../../utils'
const CirculatingSupply = () => {
  const [supply] = useGlobal('supply');

  let settings = getBarSettings(supply);

  return (
    <Wrapper>
      <Card title={`Supply Breakdown for ${formatCurrency(supply.total, '.2s')}`}>
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
export default CirculatingSupply;


function getBarSettings(supply) {
  return [
    {
      percent: (supply.circulating / supply.total) * 100,
      color: '#3e85f2',
      title: 'Circulating',
      value: supply.circulating,
    },
    {
      percent: (supply.unvested / supply.total) * 100,
      color: '#4672b9',
      title: 'Unvested',
      value: supply.unvested,
    },
    {
      percent: (supply.frozen / supply.total) * 100,
      color: '#49679b',
      title: 'Frozen',
      value: supply.frozen,
    },
    {
      percent: (supply.unclaimed / supply.total) * 100,
      color: '#30313b',
      title: 'Unclaimed',
      value: supply.unclaimed,
    },
  ];
}

