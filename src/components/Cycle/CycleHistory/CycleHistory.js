import React from 'react';
import styled from 'styled-components';
import { Card, FlexRowSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';
import CycleSegmentBar from './CycleSegmentBar';
import { format } from 'd3-format';

const CycleHistory = ({ cycle, lastCycle }) => {
  return (
    <Wrapper>
      <Card title={'Cycle History'}>
        <FlexRowSpaceBetween mb={20}>
          <CycleSegmentBar
            isCurrent={cycle.snapshot_cycle&&cycle.snapshot_cycle.is_active}
            isSnapshot={cycle.snapshot_cycle&&cycle.snapshot_cycle.is_snapshot}
            percentage={cycle.snapshot_cycle?cycle.snapshot_cycle.progress:0}
            cycle={cycle.snapshot_cycle}
            index={cycle.snapshot_cycle?cycle.snapshot_cycle.snapshot_index:0} />
          <CycleDots cycleNumber={cycle.snapshot_cycle?cycle.snapshot_cycle.cycle:-(cycle.cycle+1)} lastCycle={lastCycle} />
          <CycleSegmentBar
            isCenter={true}
            isCurrent={cycle.is_active}
            percentage={cycle.progress}
            cycle={cycle}
            isSnapshot={cycle.is_snapshot}
            index={cycle.snapshot_index} />
          <CycleDots cycleNumber={cycle.cycle} lastCycle={lastCycle} />
          <CycleSegmentBar
            isCurrent={cycle.follower_cycle.is_active}
            isSnapshot={cycle.follower_cycle.is_snapshot}
            percentage={cycle.follower_cycle.progress}
            cycle={cycle.follower_cycle}
            index={cycle.follower_cycle.snapshot_index} />
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
              <Dot
                style={{background:(
                  (lastCycle<cycleNumber+item) ? '#525566':
                  (lastCycle===cycleNumber+item) ? '#19EDF4':'#29C0FF')}}
                cycle={format(',')(cycleNumber+item)}
              />
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
  position: relative;
  &:hover {
    border: 1px solid #fff;
    &:after {
      content: '${prop => (prop.cycle ? prop.cycle : '')}';
      position: absolute;
      color: rgba(255,255,255,0.52);
      font-size: 10px;
      top: -40px;
      transform: translate(-50%,0);
      margin-left: 3px;
    }
    &:before {
      content: '${prop => (prop.cycle ? '|' : '')}';
      position: absolute;
      font-weight: 100;
      color: rgba(255, 255, 255, 0.52);
      z-index: -1;
      font-size: 22px;
      top: -31px;
      left: -0.5px;
    }
  }
`;
export default CycleHistory;
