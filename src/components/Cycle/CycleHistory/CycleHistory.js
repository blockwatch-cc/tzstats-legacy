import React from 'react';
import styled from 'styled-components';
import { Card, RowSpace } from '../../Common';
import { Link } from 'react-router-dom';
import CycleSegmentBar from './CycleSegmentBar';
import { format } from 'd3-format';

const CycleHistory = ({ cycle, lastCycle, count }) => {

  return (
    <Wrapper>
      <Card title={'Cycle History'}>
        <RowSpace>
          <CycleSegmentBar
            isCurrent={cycle.snapshot_cycle&&cycle.snapshot_cycle.is_active}
            isSnapshot={cycle.snapshot_cycle&&cycle.snapshot_cycle.is_snapshot}
            percentage={cycle.snapshot_cycle?cycle.snapshot_cycle.progress:0}
            cycle={cycle.snapshot_cycle}
            index={cycle.snapshot_cycle?cycle.snapshot_cycle.snapshot_index:0} />
          <CycleDots cycleNumber={cycle.snapshot_cycle?cycle.snapshot_cycle.cycle:-(cycle.cycle+1)} lastCycle={lastCycle} count={count} />
          <CycleSegmentBar
            isCenter={true}
            isCurrent={cycle.is_active}
            percentage={cycle.progress}
            cycle={cycle}
            isSnapshot={cycle.is_snapshot}
            index={cycle.snapshot_index} />
          <CycleDots cycleNumber={cycle.cycle} lastCycle={lastCycle} count={count} />
          <CycleSegmentBar
            isCurrent={cycle.follower_cycle.is_active}
            isSnapshot={cycle.follower_cycle.is_snapshot}
            percentage={cycle.follower_cycle.progress}
            cycle={cycle.follower_cycle}
            index={cycle.follower_cycle.snapshot_index} />
        </RowSpace>
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

const CycleDots = ({ cycleNumber, lastCycle, count }) => {
  let numCycles = cycleNumber<0?(-cycleNumber)-1:count+2;
  cycleNumber = cycleNumber<0?-1:cycleNumber;
  return (
    <RowSpace zIndex={1} flex={0.4} alignItems={'center'}>
      {Array.from(Array(count+2).keys()).slice(1,numCycles).map(item => {
        return (
          <Link key={cycleNumber + item} to={`/cycle/${cycleNumber + item}`}>
            <DotBox cycle={format(',')(cycleNumber+item)}>
              <Dot
                style={{background:(
                  (lastCycle<cycleNumber+item) ? '#525566':
                  (lastCycle===cycleNumber+item) ? '#19EDF4':'#29C0FF')}}
              />
            </DotBox>
          </Link>
        );
      })}
    </RowSpace>
  );
};
const DotBox = styled.div`
  cursor: pointer;
  padding: 17px;
  position: relative;
  &:hover {
    &:after {
      content: '${prop => (prop.cycle ? prop.cycle : '')}';
      position: absolute;
      color: rgba(255,255,255,0.52);
      font-size: 10px;
      top: -20px;
      transform: translate(-50%,0);
      margin-left: 3px;
    }
    &:before {
      content: '${prop => (prop.cycle ? '|' : '')}';
      position: absolute;
      font-weight: 100;
      color: rgba(255, 255, 255, 0.52);
      z-index: -1;
      font-size: 16px;
      top: -8px;
      margin-left: 3.5px;
      transform: translate(-50%,0);
    }
  }
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
