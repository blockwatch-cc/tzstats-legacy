import React from 'react';
import styled from 'styled-components';
import { Card, Value, AlignedForm, LabelDotLeft } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';

const CirculatingSupply = () => {
  const [chain] = useGlobal('chain');

  let bar = getBarSettings(chain);
  let all = [
    {
      percent: 100,
      color: '#ccc',
      title: 'Total Supply',
      value: chain.supply.total,
    },
    ...bar,
    {
      percent: chain.supply.active_staking / (chain.supply.total||1) * 100,
      color: '#777',
      title: 'Staking Supply',
      value: chain.supply.active_staking,
    },
    {
      percent: chain.supply.circulating / (chain.supply.total||1) * 100,
      color: '#999',
      title: 'Circulating Supply',
      value: chain.supply.circulating,
    }
  ];

  return (
    <Wrapper>
      <Card title="Tezos Supply Distribution">
        <HorizontalProgressBar settings={bar} />
        <AlignedForm>
          <div>
            {all.map((item, i) => {
              return (
                <LabelDotLeft key={i} color={item.color}>
                  {item.title}
                </LabelDotLeft>
              );
            })}
          </div>
          <div>
            {all.map((item, i) => {
              return <Value
                key={i}
                pad={0.25}
                ml={1}
                type="currency"
                digits={0}
                dim={0}
                round={true}
                value={item.value} />;
            })}
          </div>
          <div>
            {all.map((item, i) => {
              return (
                <Value
                  key={i}
                  pad={0.25}
                  ml={1}
                  type="percent"
                  value={item.percent / 100}
                  digits={2}
                  dim={0}
                  opacity={0.7}
                  zero="-"
                />
              );
            })}
          </div>
        </AlignedForm>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  margin: 0 5px;
`;
export default CirculatingSupply;


function getBarSettings(chain) {
  const s = chain.supply;
  let liquid = s.total - s.unvested - s.unclaimed - s.frozen;
  return [
    {
      percent: (liquid / chain.supply.total) * 100,
      color: '#3e85f2',
      title: 'Liquid Supply',
      value: liquid,
    },
    {
      percent: (chain.supply.unvested / chain.supply.total) * 100,
      color: '#4672b9',
      title: 'Unvested Supply',
      value: chain.supply.unvested,
    },
    {
      percent: (chain.supply.frozen / chain.supply.total) * 100,
      color: '#49679b',
      title: 'Frozen Supply',
      value: chain.supply.frozen,
    },
    {
      percent: (chain.supply.unclaimed / chain.supply.total) * 100,
      color: '#30313b',
      title: 'Unclaimed Supply',
      value: chain.supply.unclaimed,
    },
  ].filter(v => !!v.value);
}
