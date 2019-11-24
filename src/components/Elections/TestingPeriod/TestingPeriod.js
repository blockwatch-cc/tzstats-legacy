import React from 'react';
import styled from 'styled-components';
import { Card, FlexRowSpaceBetween, FlexColumnSpaceAround, EmptyData } from '../../Common';
import { getEndTime } from '../../../utils';
import { getProposalByHash } from '../../../config/proposals';


const TestingPeriod = ({ period }) => {
  if (!period) {
    return (<EmptyWrapper><EmptyData title={'3 Testing period not started'}  mh={250}/></EmptyWrapper>);
  }
  const endTime = getEndTime(period);
  const proposalDetails = getProposalByHash(period.proposals[0].hash);
  return (
    <Wrapper>
      <Card title={`3 Testing period ${endTime}`} mh={250}>
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
        <FlexRowSpaceBetween flex={1} alignItems="flex-end">
          <div></div>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
  font-size: 14px;
`;

const EmptyWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
  font-size: 14px;
  opacity: 0.5;
`;

const Content = styled.p`
  font-size: 12px;
  line-height: 1.4;
  flex: 1;
`;

export default TestingPeriod;
