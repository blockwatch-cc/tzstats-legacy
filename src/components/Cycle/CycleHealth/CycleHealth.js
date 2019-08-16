import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowWrap, FlexRow, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';
import { convertMinutes } from '../../../utils';

const CycleHealth = ({ cycle }) => {
  const cyclePeriod = new Date(cycle.end_time).getTime() - new Date(cycle.start_time).getTime();
  const cycleSolveTime = convertMinutes(cyclePeriod / 60000);

  return (
    <Wrapper>
      <Card title={'Cycle Health'}>
        <FlexRowSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Active Bakers" value={cycle.active_bakers} />
            <DataBox title="Active Endorsers" value={cycle.active_endorsers} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Missed Block Priorites" value={cycle.missed_priorities} />
            <DataBox title="Missed Endorsments" value={cycle.missed_endorsements} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Double Baking" value={cycle.n_double_baking} />
            <DataBox title="Double Endorsments" value={cycle.n_double_endorsement} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Orphaned Blocks" value={cycle.n_orphans} />
            <DataBox title="Cycle Solvetime" valueType="text" value={cycleSolveTime} />
          </FlexColumnSpaceBetween>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 340px;
  flex:2
  margin: 0 5px;
`;
export default CycleHealth;
