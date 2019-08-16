import React from 'react';
import styled from 'styled-components';
import { Card, FlexRowSpaceBetween } from '../../Common';
import { Link } from 'react-router-dom';
import CycleSegmentBar from './CycleSegmentBar';

const CycleHistory = ({ cycle }) => {
  return (
    <Wrapper>
      <Card title={'Cycle History'}>
        <FlexRowSpaceBetween mb={20}>
          <CycleSegmentBar percentage={cycle.snapshot_cycle.progress} cycle={cycle.snapshot_cycle} />
          <CycleDots cycleNumber={cycle.snapshot_cycle.cycle} />
          <CycleSegmentBar isCurrent={true} percentage={cycle.progress} cycle={cycle} />
          <CycleDots cycleNumber={cycle.cycle} />
          <CycleSegmentBar percentage={cycle.follower_cycle.progress} cycle={cycle.follower_cycle} />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

const CycleDots = ({ cycleNumber }) => {
  return (
    <FlexRowSpaceBetween zIndex={1000} flex={0.4}>
      {[1, 2, 3, 4, 5, 6, 7].map(item => {
        return (
          <Link key={cycleNumber + item} to={`/cycle/${cycleNumber + item}`}>
            <DotBox>
              <Dot />
            </DotBox>
          </Link>
        );
      })}
    </FlexRowSpaceBetween>
  );
};
const DotBox = styled.div`
  cursor: pointer;
  padding: 15px;
`;
const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 3px;
  background: linear-gradient(45deg, #26b2ee 0%, #29c0ff 100%);
  &:hover {
    border: 1px solid #fff;
  }
`;
export default CycleHistory;
