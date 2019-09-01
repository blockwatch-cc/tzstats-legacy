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
import CycleEvolutionChart from './CycleEvolutionChart';

const StakingCycleEvolution = () => {
  const tempStakingData = [
    { time: Date.now(), delegators: 14, bakers: 151, endorsers: 10 },
    { time: Date.now() - 60000 * 60 * 24, delegators: 145, bakers: 14, endorsers: 120 },
    { time: Date.now() - 2 * (60000 * 60 * 24), delegators: 50, bakers: 121, endorsers: 100 },
  ];
  const status = getNetworkHealthStatus(100);
  const settings = getBakerSettings();
  return (
    <Wrapper>
      <Card title={`Cycle Evolution`}>
        <FlexRowWrap>
          <FlexRow flex={1} mb={10}>
            <CycleEvolutionChart type={'svg'} data={tempStakingData} />
          </FlexRow>
          <FlexRowSpaceBetween width={350} ml={30}>
            <FlexColumnSpaceBetween mt={10} minHeight={150}>
              <LegendItem color={'#17eef4'}>
                <DataBox valueSize="16px" title="Active Delegators" value={123} />
              </LegendItem>
              <LegendItem color={'#22BAF8 '}>
                <DataBox valueSize="16px" title="Active Bakers" value={123} />
              </LegendItem>
              <LegendItem color={'#626977'}>
                <DataBox valueSize="16px" title="Active Endorsers" value={123} />
              </LegendItem>
            </FlexColumnSpaceBetween>
            <FlexColumn width={200} minHeight={150}>
              <FlexColumn mb={25}>
                <FlexRowSpaceBetween>
                  <DataBox valueSize="14px" valueType="text" value={'100%'} />
                  <DataBox valueSize="14px" valueType="text" value={status.name} />
                </FlexRowSpaceBetween>
                <FlexRow>
                  {[...new Array(6).keys()].map((item, i) => {
                    return <NetworkHealthIndicator isEmpty={i + 1 > status.value} key={i} />;
                  })}
                </FlexRow>
                <FlexRowSpaceBetween>
                  <DataBox title="Bakers Efficency" />
                  <DataBox title="Network Health" />
                </FlexRowSpaceBetween>
              </FlexColumn>
              <FlexRowSpaceBetween>
                <DataBox valueSize="14px" title="Baking Participation" valueType="percent" value={0.5} />
                <DataBox valueSize="14px" title="Stacking Providers" value={14413} />
              </FlexRowSpaceBetween>
            </FlexColumn>
          </FlexRowSpaceBetween>
        </FlexRowWrap>
      </Card>
    </Wrapper>
  );
};

function getBakerSettings() {
  return [
    {
      percent: 65,
      color: '#418BFD',
      title: 'Bakers Efficency',
      value: 144,
    },
    {
      percent: 35,
      color: '#858999;',
      title: 'Network Health',
      value: 14142,
    },
  ];
}

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;

const NetworkHealthIndicator = styled.div`
  height: 8px;
  width: 33px;
  margin-left: 1px;
  display: inline-block;
  background-color: ${props => (props.isEmpty ? '#525566' : ' #26B2EE')};
`;

const LegendItem = styled.div`
  margin-bottom: -28px;
  margin-left: 20px;
  white-space: nowrap;
  min-width: 130px;
  &:after {
    content: '•';
    position: relative;
    left: -20px;
    bottom: 45px;
    font-size: 30px;
    color: ${prop => prop.color};
  }
`;

export default StakingCycleEvolution;
