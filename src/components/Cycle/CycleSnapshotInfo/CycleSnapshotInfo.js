import React from 'react';
import styled from 'styled-components';
import {
  Card,
  DataBox,
  FlexRowWrap,
  FlexRow,
  FlexRowSpaceBetween,
  FlexColumn,
  FlexColumnSpaceBetween,
} from '../../Common';
import { get60mTimeRange, wrappBlockDataToObj } from '../../../utils';
import { timeFormat } from 'd3-time-format';
import { Link } from 'react-router-dom';
import Popover from '../../Common/Popover';

const CycleSnapshotInfo = ({ currentCycle }) => {
  return (
    <Wrapper>
      <Card title={'Snapchot Info'}>
        <FlexRowSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Date" value={7} />
            {/* <DataBox title="Participation" value={staking_percent} /> */}
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Block Height" value={7} />
            <DataBox title="Roll Owners" value={7} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <div>&nbsp;</div>
            <DataBox title="Rolls" value={7} />
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
