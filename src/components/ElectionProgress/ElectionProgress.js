import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRow, FlexRowSpaceBetween, CopyHashButton } from '../Common';
import { HorizontalProgressBar } from '../ProgressBar';
import { proposals } from '../../config/proposals'
import { convertMinutes, getShortHash } from '../../utils';
import _ from 'lodash';

const ElectionProgress = ({ election }) => {
  console.log("Election ", election);
  let vote = election[election.voting_period];
  let voteSettings = getVoteSettings(vote);
  let proposalSettings = getProposalSettings(vote);
  let topProposal = _.maxBy(vote.proposals, r => r.rolls)
  let proposalDetails = proposals[topProposal.hash];
  let endTime = (new Date(vote.period_end_time) - Date.now()) / 60000


  return (
    <Wrapper>
      {
        vote
          ? <Card title={`On-Chain Governance ${PeriodNames[vote.voting_period_kind]} closes in ${convertMinutes(endTime)}`}>
            <FlexRowSpaceBetween>
              <DataBox title="Participation Rolls" value={vote.turnout_rolls} />
              <DataBox title="Maximum Rolls" value={vote.eligible_rolls} />
            </FlexRowSpaceBetween>
            <HorizontalProgressBar settings={voteSettings} />
            <HorizontalProgressBar settings={proposalSettings} />
            <FlexRowSpaceBetween>
              <DataBox title={proposalDetails.name} value={topProposal.rolls} />
              <a target="_blank" style={{ fontSize: 12 }} href={proposalDetails.link}>{getShortHash(topProposal.hash)}</a>
            </FlexRowSpaceBetween>
          </Card>
          :
          <Card title={`On-Chain Governance Proposal Period closes in ${convertMinutes(endTime)}`}>
            <Content> <Strong> No Proposal</Strong> submitted yet.</Content>
          </Card>

      }

    </Wrapper>
  );
};
const Strong = styled.strong`
color: #fff;
fonst-size: 13;
`
const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;
const Content = styled.div`
  min-height: 62px;
  font-size: 12px;
  color:rgba(255,255,255,0.52);

`
const PeriodNames = {
  "proposal": "Proposal Period",
  "testing_vote": "Testing Vote",
  "testing": "Testing Period",
  "promotion_vote": "Promotion Vote"
}
function getVoteSettings(vote) {
  let topProposal = vote.proposals[0]
  return [
    {
      percent: (vote.turnout_rolls / vote.eligible_rolls) * 100,
      color: '#19f3f9',
      title: 'Participation Rolls',
      value: vote.turnout_rolls,
    },
    {
      percent: ((vote.eligible_rolls - vote.turnout_rolls) / vote.eligible_rolls) * 100,
      color: '#858999;',
      title: 'Maximum Rolls',
      value: vote.eligible_rolls - vote.turnout_rolls,
    },
  ];
}

//Todo remove || 1
function getProposalSettings(vote) {

  let topProposal = vote.proposals[0]

  return [
    {
      percent: (topProposal.rolls / vote.eligible_rolls) * 100,
      color: '#19f3f9',
      title: 'Top Proposal Rolls',
      value: topProposal.rolls,
    },
    {
      percent: ((vote.eligible_rolls - topProposal.rolls) / vote.eligible_rolls) * 100,
      color: '#858999;',
      title: 'Maximum Top Rolls',
      value: vote.eligible_rolls - topProposal.rolls,
    },
  ];
}

export default ElectionProgress;

