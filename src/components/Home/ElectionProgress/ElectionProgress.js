import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowSpaceBetween, FlexColumnSpaceAround } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { getEndTime } from '../../../utils';
import { govNames } from '../../../config';
import { getProposalByHash } from '../../../config/proposals';
import _ from 'lodash';

const ElectionProgress = ({ election }) => {
  const period = election[election.voting_period];
  const endTime = getEndTime(period,0,1);
  const title = `${govNames[election.num_periods]} Period ${endTime}`;
  return (
    <Wrapper>
      <Card title={title} mh={112}>
        <FlexColumnSpaceAround flex={1}>
          <GovSwitcher period={period} election={election}/>
        </FlexColumnSpaceAround>
      </Card>
    </Wrapper>
  );
};

const GovSwitcher = ({ period, election }) => {
  switch (period.voting_period_kind) {
    case 'proposal':
      return <Proposal period={period} />;
    case 'testing_vote':
      return <Vote period={period} />;
    case 'testing':
      return <Testing period={period} election={election} />;
    case 'promotion_vote':
      return <Vote period={period} />;
    default:
      return <></>;
  }
};

const Proposal = ({ period }) => {
  const prop = _.maxBy(period.proposals, d => d.rolls);
  const lead = getProposalByHash(prop?prop.hash:null);
  const empty = !period.proposals.length;
  return !empty ? (
    <FlexRowSpaceBetween>
      <DataBox valueSize="14px" title={`Proposals`} value={period.proposals.length} />
      <DataBox valueSize="14px" title={`Participation`} valueType="percent" valueOpts={{zero:'-'}} value={period.turnout_pct/10000} />
      <DataBox valueSize="14px" title={`Lead Proposal`} valueType="text" value={lead.name||'-'} />
    </FlexRowSpaceBetween>
  ): (
    <Empty>
      No Proposal was submitted so far.
    </Empty>
  );
};

const Testing = ({ period, election }) => {
  const proposal = getProposalByHash(period.proposals[0].hash)
  return (
    <FlexRowSpaceBetween>
      <OutLink target="_blank" rel="noopener noreferrer" href={proposal.link}>
        <DataBox valueSize="14px" title={`Proposal`} valueType="text" value={proposal.name} />
      </OutLink>
      <DataBox valueSize="14px" title={`Participation`} valueType="percent" valueOpts={{digits:2,zero:'0%'}} value={election["testing_vote"].turnout_pct/10000} />
      <DataBox valueSize="14px" title={`Acceptance`} valueType="percent" valueOpts={{digits:2,zero:'0%'}} value={election["testing_vote"].yay_rolls / (election["testing_vote"].yay_rolls+election["testing_vote"].nay_rolls)} />
    </FlexRowSpaceBetween>
  );
};

const Vote = ({ period }) => {
  let settings = getPeriodSettings(period);
  return (
    <>
      <FlexRowSpaceBetween>
        <DataBox value={period.turnout_rolls} />
        <DataBox value={period.eligible_rolls} />
      </FlexRowSpaceBetween>
      <HorizontalProgressBar settings={settings} />
      <FlexRowSpaceBetween>
        <DataBox title={`Participating Rolls (${period.turnout_pct/100}% / ${period.quorum_pct/100}%)`}  />
        <DataBox title={`Maximum Rolls`} />
      </FlexRowSpaceBetween>
    </>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
  display: flex;
`;

const Empty = styled(FlexRowSpaceBetween)`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.52);
`;

const OutLink = styled.a``;

function getPeriodSettings(period) {
  return [
    {
      percent: period.turnout_pct/100.0,
      color: '#19f3f9',
      title: 'Participating Rolls',
      value: period.turnout_rolls,
    },
    {
      percent: 100.0-period.turnout_pct/100.0,
      color: '#858999;',
      title: 'Maximum Rolls',
      value: period.eligible_rolls - period.turnout_rolls,
    },
  ];
}

export default ElectionProgress;
