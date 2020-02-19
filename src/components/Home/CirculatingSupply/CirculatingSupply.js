import React from 'react';
import styled from 'styled-components';
import { Card, FlexColumnSpaceBetween, Value, AlignedForm, LabelDotLeft } from '../../Common';
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
  ];

  return (
    <Wrapper>
      <Card title="Tezos Supply">
        <FlexColumnSpaceBetween>
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
                return <Value pad={0.25} ml={1} type="currency" digits={4} dim={0} value={item.value} />;
              })}
            </div>
            <div>
              {all.map((item, i) => {
                return (
                  <Value
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
        </FlexColumnSpaceBetween>
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
