import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';

const CycleSnapshotInfo = ({ cycle }) => {
  return (
    <Wrapper>
      <Card title={'Snapshot Info'}>
        {cycle.snapshot_cycle ? (cycle.snapshot_cycle.is_snapshot ? (
          <FlexRowSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <Link to={`/${cycle.snapshot_cycle.snapshot_height}`}>
                <DataBox title="Block" value={cycle.snapshot_cycle.snapshot_height} />
              </Link>
              <DataBox title="Staking Ratio" valueType="percent" value={cycle.snapshot_cycle.staking_percent/100} />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <Link to={`/cycle/${cycle.snapshot_cycle.cycle}`}>
                <DataBox title="Cycle" value={cycle.snapshot_cycle.cycle} />
              </Link>
              <DataBox title="Roll Owners" value={cycle.snapshot_cycle.roll_owners} />
            </FlexColumnSpaceBetween>
            <FlexColumnSpaceBetween minHeight={100}>
              <DataBox title="Index" value={cycle.snapshot_cycle.snapshot_index} />
              <DataBox title="Rolls" value={cycle.snapshot_cycle.rolls} />
            </FlexColumnSpaceBetween>
          </FlexRowSpaceBetween>
        ) : (
          <Text>A roll snapshot for cycle {cycle.cycle} will be selected at end of <Link key="next" to={`/cycle/${cycle.cycle-6}`}>cycle {cycle.cycle-6}</Link>.</Text>
        )) : (
          <Text>{`No roll snapshot for cycle ${cycle.cycle}!`}</Text>
        )}
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 300px;
  flex:1
  margin: 0 5px;
`;
const Text = styled.div`
  font-size: 14px;
  height: 100px;
`;
export default CycleSnapshotInfo;
