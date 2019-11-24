import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';
import { convertMinutes } from '../../../utils';

const CycleHealth = ({ cycle }) => {
  const cyclePeriod = new Date(cycle.end_time).getTime() - new Date(cycle.start_time).getTime();
  const cycleSolveTime = convertMinutes(cyclePeriod / 60000);

  return (
    <Wrapper>
      <Card title={`Cycle ${cycle.cycle}  Health`}>
        {cycle.is_active || cycle.is_complete ? (
          <FlexRowSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <DataBox title="Active Bakers" value={cycle.active_bakers} />
              <DataBox title="Active Endorsers" value={cycle.active_endorsers} />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <DataBox title="Missed Priorities" value={cycle.missed_priorities} />
              <DataBox title="Missed Endorsements" value={cycle.missed_endorsements} />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <DataBox title="Double Baking" value={cycle.n_double_baking} />
              <DataBox title="Double Endorsements" value={cycle.n_double_endorsement} />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <DataBox title="Orphaned Blocks" value={cycle.n_orphans} />
              <DataBox title="Cycle Solvetime" valueType="text" value={cycleSolveTime} />
            </FlexColumnSpaceBetween>
          </FlexRowSpaceBetween>
        ) : (
          <FlexRowSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <DataBox title="Active Bakers" valueType="text" value="-" />
              <DataBox title="Active Endorsers" valueType="text" value="-" />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <DataBox title="Missed Priorites" valueType="text" value="-" />
              <DataBox title="Missed Endorsements" valueType="text" value="-" />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <DataBox title="Double Baking" valueType="text" value="-" />
              <DataBox title="Double Endorsements" valueType="text" value="-" />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <DataBox title="Orphaned Blocks" valueType="text" value="-" />
              <DataBox title="Cycle Solvetime" valueType="text" value="-" />
            </FlexColumnSpaceBetween>
          </FlexRowSpaceBetween>
        )}
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 300px;
  flex:2
  margin: 0 5px;
`;
export default CycleHealth;
