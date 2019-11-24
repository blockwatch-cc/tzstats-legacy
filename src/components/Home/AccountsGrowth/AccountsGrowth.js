import React from 'react';
import styled from 'styled-components';
import { Card } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';
import { format } from 'd3-format';

const AccountsGrowth = props => {
  const [chain] = useGlobal('chain');

  let settings = getBarSettings(chain);

  return (
    <Wrapper>
      <Card title={'Tezos Account Growth (30d)'}>
        <Details>
          <Value>{format(',')(chain.new_accounts_30d)}</Value>
          <Value>{format(',')(chain.cleared_accounts_30d)}</Value>
        </Details>
        <HorizontalProgressBar settings={settings} />
        <Details>
          <Title>New Accounts</Title>
          <Title>Cleared Accounts</Title>
        </Details>
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
const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Title = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
`;
const Value = styled.div`
  color: #fff;
  font-size: 18px;
`;

export default AccountsGrowth;

function getBarSettings(chain) {
  return [
    {
      percent: (chain.new_accounts_30d / (chain.new_accounts_30d + chain.cleared_accounts_30d)) * 100,
      color: '#19f3f9',
      title: 'New Accounts',
      value: `${chain.new_accounts_30d}`,
    },
    {
      percent: (chain.cleared_accounts_30d / (chain.new_accounts_30d + chain.cleared_accounts_30d)) * 100,
      color: '#858999;',
      title: 'Cleared Accounts',
      value: `${chain.cleared_accounts_30d}`,
    },
  ];
}
