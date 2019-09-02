import React from 'react';
import styled from 'styled-components';
import {
  Card,
  Legend,
  FlexRow,
  FlexRowWrap,
  FlexRowSpaceBetween,
  DataBox,
  FlexColumn,
  FlexColumnSpaceAround,
  FlexColumnSpaceBetween,
} from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { useGlobal } from 'reactn';
import { formatCurrency, getNetworkHealthStatus } from '../../../utils';
import WealthCentralizationChart from './WealthCentralizationChart';

const WealthCentralization = () => {
  const tempStakingData = [
    { time: Date.now(), delegators: 14, bakers: 151, endorsers: 10 },
    { time: Date.now() - 60000 * 60 * 24, delegators: 145, bakers: 14, endorsers: 120 },
    { time: Date.now() - 2 * (60000 * 60 * 24), delegators: 50, bakers: 121, endorsers: 100 },
    { time: Date.now() - 3 * (60000 * 60 * 24), delegators: 10, bakers: 151, endorsers: 110 },
  ];

  return (
    <Wrapper>
      <Card title={`Wealth Centralization By Address`}>
        <FlexRowSpaceBetween>
          <FlexColumn>
            <FlexRow width={400} mb={10}>
              <WealthCentralizationChart type={'svg'} data={tempStakingData} />
            </FlexRow>
            <FlexRow>
              <LegendItem color={'#29C0FF'}>
                <DataBox title="Value > 10 M" />
              </LegendItem>
              <LegendItem color={'#418BFD'}>
                <DataBox title="Value > 1 M" />
              </LegendItem>
              <LegendItem color={'##858999'}>
                <DataBox title="Value > 100 k" />
              </LegendItem>
            </FlexRow>
          </FlexColumn>
          <FlexColumn>
            <FlexRow width={400} mb={10}>
              <WealthCentralizationChart type={'svg'} data={tempStakingData} />
            </FlexRow>
            <FlexRow>
              <LegendItem color={'#29C0FF'}>
                <DataBox title="Count > 10 M" />
              </LegendItem>
              <LegendItem color={'#418BFD'}>
                <DataBox title="Count > 1 M" />
              </LegendItem>
              <LegendItem color={'##858999'}>
                <DataBox title="Count > 100 k" />
              </LegendItem>
            </FlexRow>
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

export default WealthCentralization;
