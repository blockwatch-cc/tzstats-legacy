import React from 'react';
import styled from 'styled-components';
import { DataBox, FlexRowWrap, FlexRow, FlexColumn } from '../../Common';
import { PieChart, AreaChart, BarChart } from '../../Charts';

const ActivationsTab = () => {
  const settings = getActivationSettings();
  const data = [
    { time: Date.now(), value: 20 },
    { time: Date.now() - 60000, value: 13 },
    { time: Date.now() - 2 * 60000, value: 25 },
    { time: Date.now() - 3 * 60000, value: 41 },
  ];

  const testData = [
    { time: '01-01-2019', value: 15, y2: -4 },
    { time: '01-02-2019', value: 5, y2: 10 },
    { time: '01-03-2019', value: 15, y2: -4 },
    { time: '01-04-2019', value: 24, y2: -4 },
    { time: '01-05-2019', value: 15, y2: -4 },
    { time: '01-06-2019', value: 4, y2: -4 },
    { time: '01-07-2019', value: 15, y2: -4 },
    { time: '01-08-2019', value: 41, y2: -4 },
    { time: '01-09-2019', value: 15, y2: -4 },
    { time: '01-10-2019', value: 25, y2: -4 },
    { time: '01-11-2019', value: 15, y2: -4 },
    { time: '01-12-2019', value: 62, y2: -4 },
    { time: '01-13-2019', value: 15, y2: -4 },
    { time: '01-14-2019', value: 24, y2: -4 },
    { time: '01-15-2019', value: 15, y2: -4 },
    { time: '01-16-2019', value: 15, y2: -4 },
    { time: '01-17-2019', value: 10, y2: -4 },
    { time: '01-18-2019', value: 15, y2: -4 },
    { time: '01-19-2019', value: 15, y2: -4 },
    { time: '01-20-2019', value: 2, y2: -4 },
    { time: '01-21-2019', value: 15, y2: -4 },
    { time: '01-22-2019', value: 6, y2: -4 },
    { time: '01-23-2019', value: 15, y2: -4 },
    { time: '01-24-2019', value: 15, y2: -4 },
    { time: '01-25-2019', value: 9, y2: -4 },
    { time: '01-26-2019', value: 15, y2: -4 },
    { time: '01-27-2019', value: 20, y2: -4 },
    { time: '01-28-2019', value: 10, y2: -4 },
    { time: '01-29-2019', value: 3, y2: -4 },
    { time: '01-30-2019', value: 30, y2: -4 },
  ];
  return (
    <>
      <FlexRowWrap justifyContent="space-between">
        {settings.map((item, index) => {
          return (
            <FlexRow>
              <ChartWrapper>
                <PieChart key={index} {...item} />
              </ChartWrapper>
              <DataBox
                valueSize="16px"
                ml={20}
                valueType="currency"
                title={`${item.title} ${item.percent}%`}
                value={item.value}
              />
            </FlexRow>
          );
        })}
      </FlexRowWrap>
      <FlexRowWrap my={20}>
        <FlexColumn flex={0.3}>
          <AreaChart
            data={data}
            settings={{ series: [{ value: d => d.value, color: '#17eef4', fillColor: 'rgba(23, 238, 244, 0.2)' }] }}
          />
        </FlexColumn>
        <FlexColumn flex={0.3}>
          <AreaChart data={data} />
        </FlexColumn>
        <FlexColumn flex={0.3}>
          <BarChart data={testData} />
        </FlexColumn>
      </FlexRowWrap>
    </>
  );
};

function getActivationSettings() {
  return [
    {
      percent: 20,
      color: '#18ecf2',
      title: 'Activated Funds',
      value: `${2545}`,
    },
    {
      percent: 20,
      color: '#27baf8',
      title: 'Activated Accounts',
      value: `${2545}`,
    },
    {
      percent: 65,
      color: '#27baf8',
      title: 'Balancess across all non-activated accounts',
      value: `${141}`,
    },
  ];
}

const ChartWrapper = styled.div`
  width: 50px;
`;
export default ActivationsTab;
