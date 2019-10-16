import React from 'react';
import styled from 'styled-components';
import { DataBox, FlexRowWrap, FlexColumn, Title, FlexRowSpaceBetween } from '../../Common';
import HorizontalProgressBar from '../../Common/ProgressBar/HorizontalProgressBar';
import { PieChart, BarLegend } from '../../Charts';

const SupplyTab = () => {
  const settings = getSupplySettings();
  return (
    <>
      <FlexRowWrap justifyContent="space-between">
        {settings.map((item, index) => {
          return (
            <FlexColumn key={index}>
              <ChartWrapper>
                <PieChart key={index} {...item} />
              </ChartWrapper>
              <DataBox
                valueSize="16px"
                valueType="currency"
                title={`${item.title} ${item.percent}%`}
                value={item.value}
              />
            </FlexColumn>
          );
        })}
      </FlexRowWrap>
      <FlexRowWrap justifyContent="space-between">
        <Distribution />
        <Circulating />
      </FlexRowWrap>
    </>
  );
};
const Distribution = () => {
  const settings = [
    {
      percent: 20,
      color: '#1AF9FF ',
      title: 'Activated',
      value: `${2545}`,
    },
    {
      percent: 65,
      color: '#1AF9FF',
      opacity: 0.6,
      title: 'Issued',
      value: `${2545}`,
    },
    {
      percent: 15,
      color: '#1AF9FF ',
      opacity: 0.4,
      title: 'Vested',
      value: `${2545}`,
    },
  ];
  return (
    <FlexColumn mt={30} minWidth={350}>
      <Title>Distribution</Title>
      <HorizontalProgressBar settings={settings} />
      <BarLegend settings={settings} />
    </FlexColumn>
  );
};

const Circulating = () => {
  const settings = [
    {
      percent: 80,
      color: 'linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%);',
      title: 'Circulating',
      value: `${2545}`,
    },
    {
      percent: 20,
      color: '#858999',
      title: 'Frozen',
      value: `${2545}`,
    },
  ];
  return (
    <FlexColumn mt={30} minWidth={350}>
      <FlexRowSpaceBetween>
        <DataBox valueSize="16px" value={1144} valueType="currency-full" />
        <DataBox valueSize="16px" value={511544} valueType="currency-full" />
      </FlexRowSpaceBetween>
      <HorizontalProgressBar settings={settings} />
      <FlexRowSpaceBetween>
        <DataBox title={`Circulating ${65}%`} valueType="currency-full" />
        <DataBox title={`Frozen ${35}%`} valueType="currency-full" />
      </FlexRowSpaceBetween>
    </FlexColumn>
  );
};

function getSupplySettings() {
  return [
    {
      percent: 20,
      color: '#18ecf2',
      title: 'Activated',
      value: `${2545}`,
    },
    {
      percent: 20,
      color: '#27baf8',
      title: 'Circulating',
      value: `${2545}`,
    },
    {
      percent: 65,
      color: '#27baf8',
      title: 'Staking',
      value: `${141}`,
    },
    {
      percent: 14,
      color: '#3c81eb',
      title: 'Delegated',
      value: `${62}`,
    },
    {
      percent: 62,
      color: '#858999',
      title: 'Bonds',
      value: `${1456}`,
    },
    {
      percent: 34,
      color: '#858999',
      title: 'Frozen',
      value: `${625}`,
    },
    {
      percent: 12,
      color: '#858999',
      title: 'Unvested',
      value: `${6141}`,
    },
    {
      percent: 5,
      color: '#30313B',
      title: 'Unclaimed',
      value: `${822}`,
    },
  ];
}
const ChartWrapper = styled.div`
  width: 50px;
  margin-top: 20px;
`;
export default SupplyTab;
