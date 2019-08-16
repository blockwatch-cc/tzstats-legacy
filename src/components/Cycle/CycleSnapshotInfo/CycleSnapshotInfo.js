import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';
import { timeFormat } from 'd3-time-format';

const CycleSnapshotInfo = ({ cycle }) => {
  return (
    <Wrapper>
      <Card title={'Snapshot Info'}>
        <FlexRowSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox
              title={timeFormat('%B %d, %Y')(new Date(cycle.snapshot_cycle.start_time))}
              value={cycle.snapshot_cycle.cycle}
            />
            <DataBox title="Participation" value={cycle.snapshot_cycle.staking_percent} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Block Height" value={cycle.snapshot_cycle.start_height} />
            <DataBox title="Roll Owners" value={cycle.snapshot_cycle.roll_owners} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <div>&nbsp;</div>
            <DataBox title="Rolls" value={cycle.snapshot_cycle.rolls} />
          </FlexColumnSpaceBetween>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 340px;
  flex:1
  margin: 0 5px;
`;
export default CycleSnapshotInfo;
