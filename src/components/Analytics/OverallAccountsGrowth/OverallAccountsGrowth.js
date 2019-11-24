import React from 'react';
import { Card, FlexColumn, Title } from '../../Common';
import HorizontalProgressBar from '../../Common/ProgressBar/HorizontalProgressBar';
import AccountGrowthChart from './AccountGrowthChart';
import styled from 'styled-components';
import { BarLegend } from '../../Charts';

const OverallAccountsGrowth = () => {
  const settings = getAccountSettings();
  const data = getAccountGrowthData();
  return (
    <Wrapper>
      <Card title="Overall Account Growth">
        <AccountGrowthChart data={data} />
        <FlexColumn mt={50}>
          <Title>Account Types</Title>
          <HorizontalProgressBar settings={settings} />
          <BarLegend settings={settings} />
        </FlexColumn>
      </Card>
    </Wrapper>
  );
};
function getAccountGrowthData() {
  return [
    { time: '01-01-2019', y1: 15, y2: -4 },
    { time: '01-02-2019', y1: 5, y2: -20 },
    { time: '01-03-2019', y1: 15, y2: -14 },
    { time: '01-04-2019', y1: 3, y2: -14 },
    { time: '01-05-2019', y1: 15, y2: -2 },
    { time: '01-06-2019', y1: 5, y2: -24 },
    { time: '01-07-2019', y1: 15, y2: -21 },
    { time: '01-08-2019', y1: 15, y2: -62 },
    { time: '01-09-2019', y1: 12, y2: -21 },
    { time: '01-10-2019', y1: 15, y2: -21 },
    { time: '01-11-2019', y1: 15, y2: -25 },
    { time: '01-12-2019', y1: 41, y2: -2 },
    { time: '01-13-2019', y1: 15, y2: -1 },
    { time: '01-14-2019', y1: 12, y2: -6 },
    { time: '01-15-2019', y1: 15, y2: -8 },
    { time: '01-16-2019', y1: 15, y2: -10 },
    { time: '01-17-2019', y1: 15, y2: -14 },
    { time: '01-18-2019', y1: 12, y2: -15 },
    { time: '01-19-2019', y1: 15, y2: -6 },
    { time: '01-20-2019', y1: 15, y2: -4 },
    { time: '01-21-2019', y1: 4, y2: -4 },
    { time: '01-22-2019', y1: 15, y2: -14 },
    { time: '01-23-2019', y1: 15, y2: -25 },
    { time: '01-24-2019', y1: 3, y2: -4 },
    { time: '01-25-2019', y1: 15, y2: -4 },
    { time: '01-26-2019', y1: 15, y2: -35 },
    { time: '01-27-2019', y1: 2, y2: -40 },
    { time: '01-28-2019', y1: 15, y2: -4 },
    { time: '01-29-2019', y1: 8, y2: -4 },
    { time: '01-30-2019', y1: 15, y2: -4 },
  ];
}
function getAccountSettings() {
  return [
    {
      percent: 30,
      color: '#29befc',
      title: 'Implicit tz1',
      value: 1414,
    },
    {
      percent: 50,
      color: '#3891bb;',
      title: 'Managed KT1',
      value: 143,
    },
    {
      percent: 20,
      color: '#417d9f;',
      title: 'Smart Contacts KT1',
      value: 525,
    },
  ];
}
const Wrapper = styled.div`
  flex: 0.5;
  min-width: 300px;
  margin: 0 5px;
`;

export default OverallAccountsGrowth;
