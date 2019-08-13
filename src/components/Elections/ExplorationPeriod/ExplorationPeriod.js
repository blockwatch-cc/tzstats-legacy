import React from 'react';
import { Card, FlexRowSpaceBetween, DataBox, InvalidData } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { proposals } from '../../../config/proposals';
import { format } from 'd3-format';
import { getEndTime } from '../../../utils';
import styled from 'styled-components';
import _ from 'lodash';
import StartEndBlock from '../StartEndBlock';

const ExplorationPeriod = ({ period }) => {
  if (!period) {
    return <InvalidData title={'2 Exploration period not started'} />;
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
          <DataBox
            ta="right"
            title={`Quorum`}
            valueSize="14px"
            valueType="text"
            value={`${period.quorum_pct.toFixed()} %`}
          />
        </FlexRowSpaceBetween>
        <HorizontalProgressBar delimiter={period.quorum_pct} settings={periodSettings} />
        <HorizontalProgressBar delimiter={period.quorum_pct} settings={proposalSettings} />
        <FlexRowSpaceBetween>
          {period.yay_rolls ? (
            <DataBox
              valueType="percent"
              valueSize="14px"
              title={`YAY Rolls ${period.yay_rolls}`}
              value={period.yay_rolls / (period.nay_rolls + period.yay_rolls)}
            />
          ) : (
            ''
          )}
          {period.nay_rolls ? (
            <DataBox
              valueType="percent"
              valueSize="14px"
              ta="right"
              title={`NAY Rolls ${period.nay_rolls}`}
              value={period.nay_rolls / (period.nay_rolls + period.yay_rolls)}
            />
          ) : (
            ''
          )}
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
          <StartEndBlock period={period} />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

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
