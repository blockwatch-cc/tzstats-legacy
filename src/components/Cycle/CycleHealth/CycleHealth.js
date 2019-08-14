import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowWrap, FlexRow, FlexRowSpaceBetween, FlexColumnSpaceBetween } from '../../Common';

import { timeFormat } from 'd3-time-format';
import { Link } from 'react-router-dom';
import Popover from '../../Common/Popover';

const CycleHealth = ({ currentCycle }) => {
  return (
    <Wrapper>
      <Card title={'Cycle Health'}>
        <FlexRowSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Active Bakers" value={7} />
            <DataBox title="Active Endorsers" value={7} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Missed Block Priorites 2%" value={7} />
            <DataBox title="Missed Endorsments 3%" value={7} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Double Baking" value={7} />
            <DataBox title="Double Endorsments" value={7} />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight={100}>
            <DataBox title="Orphaned Blocks" value={7} />
            {/* <DataBox title="Cycle Solvetime" value={  "start_time": "2019-07-16T19:03:34Z",
  "end_time": "2019-07-19T18:33:27Z",} /> */}
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
