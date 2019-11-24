import React from 'react';
import { Card, FlexRowSpaceBetween, DataBox, EmptyData } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
// import { proposals } from '../../../config/proposals';
import { getEndTime, formatValue } from '../../../utils';
import styled from 'styled-components';

const PromotionPeriod = ({ election, period }) => {
  if (!period) {
    return (
      <EmptyWrapper>
        <EmptyData
          title={'4 Promotion period not started'}
          text={election.is_open&&election.num_periods>2&&`Approximately ${getEndTime(election, 'end_time')}`}
          mh={250}
        />
      </EmptyWrapper>
    );
  }
  const endTime = getEndTime(period);
  const periodSettings = getPeriodSettings(period);
  const proposalSettings = getProposalSettings(period);
  // const name = proposals[period.proposals[0].hash] ? proposals[period.proposals[0].hash].name : '';
  const undecidedRolls = period.eligible_rolls - period.turnout_rolls;
  const undecidedVoters = period.eligible_voters - period.turnout_voters;

  return (
    <Wrapper>
      <Card title={`4 Promotion Vote Period ${endTime}`} mh={250}>
        <FlexRowSpaceBetween mb={'5px'}>
          <DataBox
            valueType="percent"
            valueSize="14px"
            valueOpts={{digits:2,zero:'0%'}}
            title={`Participation (${formatValue(period.turnout_rolls)} rolls - ${formatValue(period.turnout_voters)}/${formatValue(period.eligible_voters)} voters)`}
            value={period.turnout_rolls / period.eligible_rolls}
          />
          <DataBox
            ta="right"
            valueType="percent"
            title={`Quorum`}
            valueSize="14px"
            valueOpts={{digits:2}}
            value={period.quorum_pct/10000}
          />
        </FlexRowSpaceBetween>
        <HorizontalProgressBar delimiter={period.quorum_pct/100} settings={periodSettings} />
        <HorizontalProgressBar delimiter={80} settings={proposalSettings} />
        <FlexRowSpaceBetween>
          <DataBox
            valueType="percent"
            valueSize="14px"
            valueOpts={{suffix:' Yes',digits:2,zero:'0%'}}
            title={`${formatValue(period.yay_rolls)} rolls - ${formatValue(period.yay_voters)} voters`}
            value={period.yay_rolls / (period.nay_rolls + period.yay_rolls)}
          />
          <DataBox
            valueType="percent"
            valueSize="14px"
            ta="right"
            valueOpts={{suffix:' No',digits:2,zero:'0%'}}
            title={`${formatValue(period.nay_rolls)} rolls - ${formatValue(period.nay_voters)} voters`}
            value={period.nay_rolls / (period.nay_rolls + period.yay_rolls)}
          />
        </FlexRowSpaceBetween>
        <FlexRowSpaceBetween flex={1} alignItems="flex-end" >
          <DataBox
            valueType="percent"
            valueSize="14px"
            valueOpts={{suffix:' Pass',digits:2,zero:'0%'}}
            title={`${formatValue(period.pass_rolls)} rolls - ${formatValue(period.pass_voters)} voters`}
            value={period.pass_rolls / period.eligible_rolls}
          />
          <DataBox
            ta="right"
            valueType="percent"
            valueSize="14px"
            valueOpts={{suffix:' Undecided',digits:2,zero:'0%'}}
            title={`${formatValue(undecidedRolls)} rolls - ${formatValue(undecidedVoters)} voters`}
            value={undecidedRolls / period.eligible_rolls}
          />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

function getPeriodSettings(period) {
  return [
    {
      percent: (period.turnout_rolls / period.eligible_rolls) * 100,
      color: 'linear-gradient(45deg, #17E5EB 0%, #1AF9FF 100%);',
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
      color: 'linear-gradient(45deg, #17E5EB 0%, #1AF9FF 100%);',
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

export default PromotionPeriod;
