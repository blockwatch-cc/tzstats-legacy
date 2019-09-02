import React from 'react';
import styled from 'styled-components';
import {
  Card,
  FlexRow,
  NoDataFound,
  DataBox,
  Spiner,
  FlexRowSpaceBetween,
  FlexColumn,
  FlexColumnSpaceBetween,
} from '../../Common';
import { getHashOrBakerName } from '../../../utils';
import WhaleDominationChart from './WhaleDominationChart';
import { HorizontalProgressBar } from '../../Common/ProgressBar';

const WhaleDomination = () => {
  const tempData = [
    { time: Date.now(), delegators: 14, bakers: 151, endorsers: 10 },
    { time: Date.now() - 60000 * 60 * 24, delegators: 145, bakers: 14, endorsers: 120 },
    { time: Date.now() - 2 * (60000 * 60 * 24), delegators: 50, bakers: 121, endorsers: 100 },
    { time: Date.now() - 3 * (60000 * 60 * 24), delegators: 10, bakers: 151, endorsers: 110 },
  ];

  return (
    <Wrapper>
      <Card title="Whale Domination">
        <FlexRowSpaceBetween>
          <FlexColumn>
            <FlexRowSpaceBetween mb={10}>
              <DataBox title="#1 Account Total Balance 4.1%" valueType="currecny-short" value={1123123} />
              <DataBox title="#2 Account Total Balance 2.1%" valueType="currecny-short" value={5141} />
              <DataBox title="#3 Account Total Balance 3.1%" valueType="currecny-short" value={14151} />
            </FlexRowSpaceBetween>
            <FlexRow width={600} mb={10}>
              <WhaleDominationChart type={'svg'} data={tempData} />
            </FlexRow>
            <FlexRow>
              <LegendItem color={'#29C0FF'}>
                <DataBox title="Top 1000" />
              </LegendItem>
              <LegendItem color={'#418BFD'}>
                <DataBox title="Top 100" />
              </LegendItem>
              <LegendItem color={'##858999'}>
                <DataBox title="Top 10" />
              </LegendItem>
            </FlexRow>
          </FlexColumn>
          <FlexColumn width={200} mb={35}>
            <DataBox valueType="currency-short" value={1414} />
            <HorizontalProgressBar
              height={5}
              settings={[{ color: '#525566', percent: 75 }, { color: '#646876', percent: 25 }]}
            />
            <DataBox title="Total supply 100%" />
            <DataBox valueType="percent" value={0.4} />

            <HorizontalProgressBar
              height={10}
              settings={[
                { color: 'linear-gradient(45deg, #17E5EB 0%, #1AF9FF 100%)', percent: 75 },
                { color: '#646876', percent: 25 },
              ]}
            />
            <DataBox title="Top 1000 accounts" />
            <DataBox valueType="percent" value={0.43} />

            <HorizontalProgressBar
              height={10}
              settings={[
                { color: 'linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%)', percent: 75 },
                { color: '#646876', percent: 25 },
              ]}
            />
            <DataBox title="Top 100 accounts" />
            <DataBox valueType="percent" value={0.2} />

            <HorizontalProgressBar
              height={10}
              settings={[
                { color: 'linear-gradient(45deg, #3B7EE5 0%, #418BFD 100%)', percent: 75 },
                { color: '#646876', percent: 25 },
              ]}
            />
            <DataBox title="Top 10 accounts" />
          </FlexColumn>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;

const LegendItem = styled.div`
  margin-left: 20px;
  margin-right: 10px;
  position: relative;
  white-space: nowrap;
  &:after {
    content: '-';
    position: absolute;
    line-height: 0;
    left: -20px;
    top: 5px;
    font-size: 30px;
    color: ${prop => prop.color};
  }
`;

export default WhaleDomination;
