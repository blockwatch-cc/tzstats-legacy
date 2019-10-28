import React from 'react';
import styled from 'styled-components';
import { Card, FlexColumnSpaceBetween, Value, AlignedForm, LabelDotLeft } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';

const CirculatingSupply = () => {
  const [chain] = useGlobal('chain');

  let bar = getBarSettings(chain);
  let all = [{
      percent: 100,
      color: '#fff',
      title: 'Total',
      value: chain.supply.total,
    }, ...bar
  ];

  return (
    <Wrapper>
      <Card title="Tezos Supply">
        <FlexColumnSpaceBetween>
          <HorizontalProgressBar settings={bar} />
          <AlignedForm>
            <div>
              {all.map((item, i) => {
                return <LabelDotLeft key={i} color={item.color}>{item.title}</LabelDotLeft>;
              })}
            </div>
            <div>
              {all.map((item, i) => {
                return <Value pad={0.25} ml={1} type="currency" digits={4} dim={0} value={item.value} />;
              })}
            </div>
            <div>
            {all.map((item, i) => {
              return <Value pad={0.25} ml={1} type="percent" value={item.percent/100} digits={2} dim={0} opacity={0.7} zero="-"/>;
            })}
            </div>
          </AlignedForm>
        </FlexColumnSpaceBetween>
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
      title: 'Circulating Supply',
      value: chain.supply.circulating,
    },
    {
      percent: (chain.supply.unvested / chain.supply.total) * 100,
      color: '#4672b9',
      title: 'Unvested Supply',
      value: chain.supply.unvested,
    },
    {
      percent: (chain.supply.unclaimed / chain.supply.total) * 100,
      color: '#49679b',
      title: 'Unclaimed Supply',
      value: chain.supply.unclaimed,
    },
    {
      percent: (chain.supply.frozen / chain.supply.total) * 100,
      color: '#30313b',
      title: 'Frozen Supply',
      value: chain.supply.frozen,
    },
  ];
}
