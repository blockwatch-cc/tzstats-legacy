import React from 'react';
import styled from 'styled-components';
import { Card, FlexRowSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';
import CycleSegmentBar from './CycleSegmentBar';

const CycleHistory = ({ cycle, lastCycle }) => {
  return (
    <Wrapper>
      <Card title={'Cycle History'}>
        <FlexRowSpaceBetween mb={20}>
          <CycleSegmentBar isCurrent={cycle.snapshot_cycle&&cycle.snapshot_cycle.is_active} percentage={cycle.snapshot_cycle?cycle.snapshot_cycle.progress:0} cycle={cycle.snapshot_cycle} />
          <CycleDots cycleNumber={cycle.snapshot_cycle?cycle.snapshot_cycle.cycle:-(cycle.cycle+1)} lastCycle={lastCycle} />
          <CycleSegmentBar isCenter={true} isCurrent={cycle.is_active} percentage={cycle.progress} cycle={cycle} />
          <CycleDots cycleNumber={cycle.cycle} lastCycle={lastCycle} />
          <CycleSegmentBar isCurrent={cycle.follower_cycle.is_active} percentage={cycle.follower_cycle.progress} cycle={cycle.follower_cycle} />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

const CycleDots = ({ cycleNumber, lastCycle }) => {
  let numCycles = cycleNumber<0?(-cycleNumber)-1:6;
  cycleNumber = cycleNumber<0?-1:cycleNumber;
  return (
    <FlexRowSpaceBetween zIndex={1000} flex={0.4}>
      {[1, 2, 3, 4, 5, 6].slice(0,numCycles).map(item => {
        return (
          <Link key={cycleNumber + item} to={`/cycle/${cycleNumber + item}`}>
            <DotBox>
              <Dot style={{background:((lastCycle<cycleNumber+item)?'#525566':'#29C0FF')}} />
            </DotBox>
          </Link>
        );
      })}
    </FlexRowSpaceBetween>
  );
};
const DotBox = styled.div`
  cursor: pointer;
  padding: 17px;
`;
const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 3px;
  background: #29C0FF;
  &:hover {
    border: 1px solid #fff;
  }
`;
export default CycleHistory;
