import React from 'react';
import { Card, FlexRowSpaceBetween, DataBox } from '../../Common'
import { HorizontalProgressBar } from '../../ProgressBar';
import { proposals } from '../../../config/proposals'
import { format } from 'd3-format';
import { convertMinutes, getShortHash } from '../../../utils';
import styled from 'styled-components';
import _ from 'lodash';
import EmptyPeriod from "../EmptyPeriod/EmptyPeriod";

const PromotionPeriod = ({ period }) => {
  if (!period) {
    return <EmptyPeriod title={"4 Promotion period not started"} />
  }
  const endTime = getEndTime(period);
  const periodSettings = getPeriodSettings(period);
  const proposalSettings = getProposalSettings(period);
  const name = proposals[period.proposals[0].hash] ? proposals[period.proposals[0].hash].name : '';

  return (
    <Wrapper>
      <Card title={`4 Promotion period for ${name} ${endTime}`}>

        <FlexRowSpaceBetween mb={"5px"}>
          <DataBox
            valueType="percent"
            title={`Participation ${period.turnout_rolls}`}
            value={(period.turnout_rolls / period.eligible_rolls)}
          />
          <DataBox title={`Quorum ${period.quorum_pct} %`} />
        </FlexRowSpaceBetween>
        <HorizontalProgressBar delimiter={period.quorum_pct} settings={periodSettings} />
        <HorizontalProgressBar delimiter={period.quorum_pct} settings={proposalSettings} />
        <FlexRowSpaceBetween>
          <DataBox
            valueType="percent"
            title={`YAY Votes ${period.yay_rolls}`}
            value={(period.yay_rolls / period.turnout_rolls)}
          />
          <DataBox
            valueType="percent"
            title={`NAY Votes ${period.nay_rolls}`}
            value={(period.nay_rolls / period.turnout_rolls)}
          />
        </FlexRowSpaceBetween>
        <FlexRowSpaceBetween mt={25}>
          <DataBox
            title="Pass Rolls"
            valueSize="14px"
            value={period.pass_rolls}
          />
          <div>
            {`${(period.period_start_block)} / ${(period.period_end_block)}`}
            <DataBox title="Start / End Block Heights" />
          </div>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};


function getEndTime(period) {
  return period.is_open
    ? `ends in ${convertMinutes((new Date(period.period_end_time) - Date.now())
      / 60000)}`
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

  return [
    {
      percent: (period.yay_rolls / period.turnout_rolls) * 100,
      color: 'linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%)',
      title: 'YAY Rolls',
      value: period.yay_rolls,
    },
    {
      percent: (period.nay_rolls / period.turnout_rolls) * 100,
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
  font-size:14px;
`;


export default PromotionPeriod;
