import React from 'react';
// import styled from 'styled-components';
import { FlexRowWrap, FlexColumn } from '../../Common';
import { AreaChart, ChartLegend } from '../../Charts';

const FeesTab = () => {
  const gasData = getGasData();
  const feesData = getFeesData();
  const feeSettings = {
    series: [
      { color: '#17eef4', fillColor: 'rgba(23, 238, 244, 0.2)', title: 'Transaction fee', value: d => d.value1 },
      { color: '#22BAF8', fillColor: 'rgba(34, 186, 248, 0.2)', title: 'Delegation fee', value: d => d.value2 },
      { color: '#626977', fillColor: 'rgba(98, 105, 119, 0.2)', title: 'Origination fee', value: d => d.value3 },
    ],
  };
  const gasSettings = {
    series: [
      { color: '#17eef4', fillColor: 'rgba(23, 238, 244, 0.2)', title: 'Transaction gas', value: d => d.value1 },
      { color: '#22BAF8', fillColor: 'rgba(34, 186, 248, 0.2)', title: 'Delegation gas', value: d => d.value2 },
      { color: '#626977', fillColor: 'rgba(98, 105, 119, 0.2)', title: 'Originations gas', value: d => d.value3 },
    ],
  };
  return (
    <FlexRowWrap>
      <FlexColumn flex={1}>
        <AreaChart art data={feesData} settings={feeSettings} />
        <ChartLegend settings={feeSettings.series} />
      </FlexColumn>
      <FlexColumn flex={1}>
        <AreaChart data={gasData} settings={gasSettings} />
        <ChartLegend settings={gasSettings.series} />
      </FlexColumn>
    </FlexRowWrap>
  );
};

function getFeesData() {
  return [
    { time: '01-01-2019', value1: 15, value2: 14, value3: 10 },
    { time: '01-02-2019', value1: 5, value2: 10, value3: 50 },
    { time: '01-03-2019', value1: 15, value2: 11, value3: 1 },
    { time: '01-04-2019', value1: 24, value2: 4, value3: 4 },
    { time: '01-05-2019', value1: 15, value2: 3, value3: 6 },
    { time: '01-06-2019', value1: 4, value2: 14, value3: 8 },
    { time: '01-07-2019', value1: 15, value2: 5, value3: 2 },
    { time: '01-08-2019', value1: 41, value2: 14, value3: 56 },
    { time: '01-09-2019', value1: 15, value2: 4, value3: 12 },
    { time: '01-10-2019', value1: 25, value2: 1, value3: 52 },
    { time: '01-11-2019', value1: 15, value2: 14, value3: 13 },
    { time: '01-12-2019', value1: 62, value2: 5, value3: 6 },
    { time: '01-13-2019', value1: 15, value2: 14, value3: 8 },
    { time: '01-14-2019', value1: 24, value2: 4, value3: 9 },
    { time: '01-15-2019', value1: 15, value2: 14, value3: 2 },
    { time: '01-16-2019', value1: 15, value2: 12, value3: 2 },
    { time: '01-17-2019', value1: 10, value2: 14, value3: 6 },
    { time: '01-18-2019', value1: 15, value2: 5, value3: 3 },
    { time: '01-19-2019', value1: 15, value2: 14, value3: 5 },
    { time: '01-20-2019', value1: 2, value2: 8, value3: 8 },
    { time: '01-21-2019', value1: 15, value2: 3, value3: 2 },
    { time: '01-22-2019', value1: 6, value2: 2, value3: 7 },
    { time: '01-23-2019', value1: 15, value2: 14, value3: 5 },
    { time: '01-24-2019', value1: 15, value2: 3, value3: 6 },
    { time: '01-25-2019', value1: 9, value2: 4, value3: 8 },
    { time: '01-26-2019', value1: 15, value2: 14, value3: 3 },
    { time: '01-27-2019', value1: 20, value2: 2, value3: 5 },
    { time: '01-28-2019', value1: 10, value2: 14, value3: 23 },
    { time: '01-29-2019', value1: 3, value2: 1, value3: 52 },
    { time: '01-30-2019', value1: 30, value2: 8, value3: 33 },
  ];
}

function getGasData() {
  return getFeesData();
}
export default FeesTab;
