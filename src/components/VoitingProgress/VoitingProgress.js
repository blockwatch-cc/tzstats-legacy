import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRow, FlexRowSpaceBetween, CopyHashButton } from '../Common';
import { HorizontalProgressBar } from '../ProgressBar';
import { proposals } from '../../config/proposals'
import { convertMinutes, getShortHash } from '../../utils';
import _ from 'lodash';

const VoitingProgress = ({ voiting }) => {
  let voitingSettings = getVoitingSettings(voiting);
  let proposalSettings = getProposalSettings(voiting);
  let topProposal = _.maxBy(voiting.proposal_vote.proposals, r => r.rolls)
  let proposalDeitels = proposals[topProposal.hash];
  let endTime = (new Date(voiting.end_time) - Date.now()) / 60000


  return (
    <Wrapper>
      {
        voiting.proposal_vote
          ? <Card title={`On-Chain Governance promotion period on ${"Athenes"} proposal period closes in ${convertMinutes(endTime)}`}>
            <FlexRowSpaceBetween>
              <DataBox title="Participation Rolls" value={voiting.proposal_vote.turnout_rolls} />
              <DataBox title="Maximum Rolls" value={voiting.proposal_vote.eligible_rolls} />
            </FlexRowSpaceBetween>
            <HorizontalProgressBar settings={voitingSettings} />
            <HorizontalProgressBar settings={proposalSettings} />
            <FlexRowSpaceBetween>
              <DataBox title={proposalDeitels.name} value={topProposal.rolls || 1000} />
              <a target="_blank" style={{ fontSize: 12 }} href={proposalDeitels.link}>{getShortHash(topProposal.hash)}</a>
            </FlexRowSpaceBetween>
          </Card>
          :
          <Card title={'Exploration Voting Progress for Proposal'}>
            <Content> We are in <Strong>Proposal Period 11 </Strong>  and there is<Strong> No Proposal</Strong> submitted yet.
            Submission <Strong>closes in 4 days</Strong> and will re-open again right after.</Content>
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
function getVoitingSettings(voiting) {
  let topProposal = voiting.proposal_vote.proposals[0]
  return [
    {
      percent: (voiting.proposal_vote.turnout_rolls / voiting.proposal_vote.eligible_rolls) * 100,
      color: '#19f3f9',
      title: 'Participation Rolls',
      value: voiting.proposal_vote.turnout_rolls,
    },
    {
      percent: ((voiting.proposal_vote.eligible_rolls - voiting.proposal_vote.turnout_rolls) / voiting.proposal_vote.eligible_rolls) * 100,
      color: '#858999;',
      title: 'Maximum Rolls',
      value: voiting.proposal_vote.eligible_rolls - voiting.proposal_vote.turnout_rolls,
    },
  ];
}

//Todo remove || 1
function getProposalSettings(voiting) {

  let topProposal = voiting.proposal_vote.proposals[0]

  return [
    {
      percent: ((topProposal.rolls || 1000) / voiting.proposal_vote.eligible_rolls) * 100,
      color: '#19f3f9',
      title: 'Top Proposal Rolls',
      value: topProposal.rolls,
    },
    {
      percent: ((voiting.proposal_vote.eligible_rolls - (topProposal.rolls || 1000)) / voiting.proposal_vote.eligible_rolls) * 100,
      color: '#858999;',
      title: 'Maximum Top Rolls',
      value: voiting.proposal_vote.eligible_rolls - topProposal.rolls,
    },
  ];
}

export default VoitingProgress;

