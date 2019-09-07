import React from 'react';
import styled from 'styled-components';
import { Card, FlexRowSpaceBetween, FlexColumnSpaceAround, EmptyData } from '../../Common';
import { getEndTime } from '../../../utils';
import { proposals } from '../../../config/proposals';

const TestingPeriod = ({ period }) => {
  if (!period) {
    return (<Wrapper><EmptyData title={'3 Testing period not started'} /></Wrapper>);
  }
  const endTime = getEndTime(period);
  const proposalDetails = proposals[period.proposals[0].hash]
    ? proposals[period.proposals[0].hash]
    : { name: '', link: '', archive: '' };
  return (
    <Wrapper>
      <Card title={`3 Testing period ${endTime}`}>
        <FlexColumnSpaceAround minHeight={172}>
        <Content>{proposalDetails.name} upgrade is investigated by the community.</Content>
        <Content>See the following links for details.</Content>
        <Content>
          <a style={{ fontSize: 12 }} target="_blank" rel="noopener noreferrer" href={proposalDetails.link}>
        {proposalDetails.link}</a><br/>
          <a style={{ fontSize: 12 }} target="_blank" rel="noopener noreferrer" href={proposalDetails.archive}>
          {proposalDetails.archive}</a>
        </Content>
        </FlexColumnSpaceAround>
        <FlexRowSpaceBetween>
          <div></div>
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
const Content = styled.p`
  font-size: 12px;
  line-height: 1.4;
  flex: 1;
`;

export default TestingPeriod;
