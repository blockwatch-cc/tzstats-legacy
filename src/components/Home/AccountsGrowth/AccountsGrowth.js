import React from 'react';
import styled from 'styled-components';
import { Card, AlignedForm, Label, Value } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';

const AccountsGrowth = props => {
  const [chain] = useGlobal('chain');

  let bar = getBarSettings(chain);

  return (
    <Wrapper>
      <Card title={'Account Growth'}>
        <HorizontalProgressBar settings={bar} />
        <Details>
          <Title>New Accounts</Title>
          <Title>Cleared Accounts</Title>
        </Details>
        <AlignedForm>
          <div>
            <Label>Total Funded Accounts</Label>
            <Label>New Accounts 30d</Label>
            <Label>Cleared Accounts 30d</Label>
            <Label>Funded Accounts 30d</Label>
          </div>
          <div>
            <Value pad={0.25} ml={1} type="value-full" dim={0} value={chain.funded_accounts} />
            <Value pad={0.25} ml={1} type="value-full" dim={0} value={chain.new_accounts_30d} />
            <Value pad={0.25} ml={1} type="value-full" dim={0} value={chain.cleared_accounts_30d} />
            <Value pad={0.25} ml={1} type="value-full" dim={0} value={chain.funded_accounts_30d} />
          </div>
          <div>
            <Value pad={0.25} ml={1} type="percent" value={1} digits={2} dim={0} opacity={0.7} zero="-" />
            <Value
              pad={0.25}
              ml={1}
              type="percent"
              value={chain.new_accounts_30d / chain.funded_accounts}
              digits={2}
              dim={0}
              opacity={0.7}
              zero="-"
            />
            <Value
              pad={0.25}
              ml={1}
              type="percent"
              value={chain.cleared_accounts_30d / chain.funded_accounts}
              digits={2}
              dim={0}
              opacity={0.7}
              zero="-"
            />
            <Value
              pad={0.25}
              ml={1}
              type="percent"
              value={chain.funded_accounts_30d / chain.funded_accounts}
              digits={2}
              dim={0}
              opacity={0.7}
              zero="-"
            />
          </div>
        </AlignedForm>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: strech;
  margin: 0 5px;
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
