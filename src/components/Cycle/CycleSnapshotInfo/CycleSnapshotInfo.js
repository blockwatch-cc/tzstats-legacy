import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';
import { timeFormat } from 'd3-time-format';

const CycleSnapshotInfo = ({ cycle }) => {
  return (
    <Wrapper>
      <Card title={'Snapshot Info'}>
        {cycle.is_snapshot ? (
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
        ) : (
          <Text>{`A roll snapshot from cycle ${cycle.cycle} will be selected at end of the cycle in
           ${((new Date(cycle.start_time).getTime() - Date.now()) / (1000 * 3600 * 24)).toFixed()} days.`}</Text>
        )}
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 340px;
  flex:1
  margin: 0 5px;
`;
const Text = styled.div`
  font-size: 14px;
`;
export default CycleSnapshotInfo;
