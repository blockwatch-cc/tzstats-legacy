import React from 'react';
import { Card, BarLegend, FlexColumn, Title } from '../../Common';
import HorizontalProgressBar from '../../Common/ProgressBar/HorizontalProgressBar';
import AccountGrowthChart from './AccountGrowthChart';
import styled from 'styled-components';

const OverallAccountsGrowth = () => {
  const settings = getAccountSettings();
  return (
    <Wrapper>
      <Card title="Overall Account Growth">
        <AccountGrowthChart />
        <FlexColumn mt={50}>
          <Title>Account Types</Title>
          <HorizontalProgressBar settings={settings} />
          <BarLegend settings={settings} />
        </FlexColumn>
      </Card>
    </Wrapper>
  );
};

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
  min-width: 340px;
  margin: 0 5px;
`;

export default OverallAccountsGrowth;
