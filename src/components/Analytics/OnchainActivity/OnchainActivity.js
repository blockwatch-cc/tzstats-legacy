import React from 'react';
import { Card } from '../../Common';
import ActivityChart from './ActivityChart';
import styled from 'styled-components';
import { ChartLegend } from '../../Charts';

const OnchainActivity = () => {
  const data = [
    { time: Date.now(), seenAddresses: 20, newAddresses: 14 },
    { time: Date.now() - 60000, seenAddresses: 14, newAddresses: 51 },
    { time: Date.now() - 2 * 60000, seenAddresses: 11, newAddresses: 14 },
    { time: Date.now() - 3 * 60000, seenAddresses: 12, newAddresses: 31 },
  ];
  return (
    <Wrapper>
      <Card title={`On-chain Activity`}>
        <ActivityChart type={'svg'} data={data} />
        <ChartLegend
          settings={[{ color: '#418BFD', title: 'Seen Addresses' }, { color: '#17eef4', title: 'New Addresses' }]}
        />
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 300px;
  margin: 0 5px;
`;
export default OnchainActivity;
