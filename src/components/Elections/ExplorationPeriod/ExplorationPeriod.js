import React from 'react';
import { Card, FlexRowSpaceBetween, DataBox, Centered } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { proposals } from '../../../config/proposals';
import { format } from 'd3-format';
import { convertMinutes, getShortHash } from '../../../utils';
import EmptyPeriod from '../EmptyPeriod/EmptyPeriod';
import styled from 'styled-components';
import _ from 'lodash';

const ExplorationPeriod = ({ period }) => {
  if (!period) {
    return <EmptyPeriod title={'2 Exploration period not started'} />;
  }
  const endTime = getEndTime(period);
  const periodSettings = getPeriodSettings(period);
  const proposalSettings = getProposalSettings(period);
  const name = proposals[period.proposals[0].hash] ? proposals[period.proposals[0].hash].name : '';
  const undecidedRolls = period.eligible_rolls - period.pass_rolls - period.nay_rolls - period.yay_rolls;

  return (
    <Wrapper>
      <Card title={`2 Exploration period for ${name} ${endTime}`}>
        <FlexRowSpaceBetween mb={'5px'}>
          <DataBox
            valueType="percent"
            valueSize="14px"
            title={`Participation ${period.turnout_rolls}`}
            value={period.turnout_rolls / period.eligible_rolls}
          />
          <DataBox title={`Quorum ${period.quorum_pct} %`} />
        </FlexRowSpaceBetween>
        <HorizontalProgressBar delimiter={period.quorum_pct} settings={periodSettings} />
        <HorizontalProgressBar delimiter={period.quorum_pct} settings={proposalSettings} />
        <FlexRowSpaceBetween>
          <DataBox
            valueType="percent"
            valueSize="14px"
            title={`YAY Rolls ${period.yay_rolls}`}
            value={period.yay_rolls / (period.nay_rolls + period.yay_rolls)}
          />
          <div style={{ textAlign: 'right' }}>
            <DataBox
              valueType="percent"
              valueSize="14px"
              title={`NAY Rolls ${period.nay_rolls}`}
              value={period.nay_rolls / (period.nay_rolls + period.yay_rolls)}
            />
          </div>
        </FlexRowSpaceBetween>
        <FlexRowSpaceBetween mt={25}>
          <DataBox
            title={`PASS Rolls ${((period.pass_rolls / period.eligible_rolls) * 100).toFixed()}%`}
            valueSize="14px"
            value={period.pass_rolls}
          />
          <DataBox
            title={`Undecided Rolls ${((undecidedRolls / period.eligible_rolls) * 100).toFixed()}%`}
            valueSize="14px"
            value={undecidedRolls}
          />
          <div>
            {`${format(',')(period.period_start_block)} / ${format(',')(period.period_end_block)}`}
            <DataBox title="Start / End Block" />
          </div>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

function getEndTime(period) {
  return period.is_open
    ? `ends in ${convertMinutes((new Date(period.period_end_time) - Date.now()) / 60000)}`
    : 'complete';
}

function getPeriodSettings(period) {
  return [
    {
      percent: (period.turnout_rolls / period.eligible_rolls) * 100,
      color: 'linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%)',
      title: 'Participation Rolls',
      value: period.turnout_rolls,
    },
    {
      percent: ((period.eligible_rolls - period.turnout_rolls) / period.eligible_rolls) * 100,
      color: '#525566;',
      title: 'Maximum Rolls',
      value: period.eligible_rolls - period.turnout_rolls,
    },
  ];
}

function getProposalSettings(period) {
  const total = period.yay_rolls + period.nay_rolls;
  return [
    {
      percent: (period.yay_rolls / total) * 100,
      color: 'linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%)',
      title: 'YAY Rolls',
      value: period.yay_rolls,
    },
    {
      percent: (period.nay_rolls / total) * 100,
      color: '#858999;',
      title: 'NAY',
      value: period.nay_rolls,
    },
  ];
}

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
  font-size: 14px;
`;

export default ExplorationPeriod;
