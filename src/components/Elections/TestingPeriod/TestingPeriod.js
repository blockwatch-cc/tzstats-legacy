import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowSpaceBetween, FlexColumn } from '../../Common';
import { format } from 'd3-format';
import { convertMinutes } from '../../../utils';
import EmptyPeriod from '../EmptyPeriod/EmptyPeriod';
import { proposals } from '../../../config/proposals';

const TestingPeriod = ({ period }) => {
  if (!period) {
    return <EmptyPeriod title={'3 Testing period not started'} />;
  }
  const endTime = getEndTime(period);
  const proposalDiteils = proposals[period.proposals[0].hash]
    ? proposals[period.proposals[0].hash]
    : { name: '', link: 'link not found' };
  return (
    <Wrapper>
      <Card title={`3 Testing period for ${proposalDiteils.name} ${endTime}`}>
        <Content>Proposed upgrade investigated by the community.</Content>

        <a style={{ fontSize: 12, marginBottom: 90 }} target="_blank" href={proposalDiteils.link}>
          {proposalDiteils.link}
        </a>
        <FlexRowSpaceBetween>
          <div></div>
          <div>
            {`${format(',')(period.period_start_block)} / ${format(',')(period.period_end_block)}`}
            <DataBox title="Start / End Block" />
          </div>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
  font-size: 14px;
`;
const Content = styled.div`
  margin-bottom: 20px;
`;
function getEndTime(period) {
  return period.is_open
    ? `ends in ${convertMinutes((new Date(period.period_end_time) - Date.now()) / 60000)}`
    : 'complete';
}

export default TestingPeriod;
