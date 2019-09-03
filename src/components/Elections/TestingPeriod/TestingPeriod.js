import React from 'react';
import styled from 'styled-components';
import { Card, FlexRowSpaceBetween, EmptyData } from '../../Common';
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
      <Card title={`3 Testing period for ${proposalDetails.name} ${endTime}`}>
        <Content>Proposed upgrade investigated by the community.</Content>

        <a style={{ fontSize: 12 }} target="_blank" rel="noopener noreferrer" href={proposalDetails.link}>
          {proposalDetails.link}
        </a>
        <a style={{ fontSize: 12, marginBottom: 70 }} target="_blank" rel="noopener noreferrer" href={proposalDetails.archive}>
          {proposalDetails.archive}
        </a>

        <FlexRowSpaceBetween mt={30}>
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
const Content = styled.div`
  margin-bottom: 22px;
`;

export default TestingPeriod;
