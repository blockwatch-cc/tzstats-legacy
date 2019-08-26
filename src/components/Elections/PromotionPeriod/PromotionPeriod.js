import React from 'react';
import { Card, FlexRowSpaceBetween, DataBox, EmptyData } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { proposals } from '../../../config/proposals';
import StartEndBlock from '../StartEndBlock';
import { getEndTime, formatValue } from '../../../utils';
import styled from 'styled-components';

const PromotionPeriod = ({ period }) => {
  if (!period) {
    return (<Wrapper><EmptyData title={'4 Promotion period not started'} /></Wrapper>);
  }
  const endTime = getEndTime(period);
  const periodSettings = getPeriodSettings(period);
  const proposalSettings = getProposalSettings(period);
  const name = proposals[period.proposals[0].hash] ? proposals[period.proposals[0].hash].name : '';
  const undecidedRolls = period.eligible_rolls - period.pass_rolls - period.nay_rolls - period.yay_rolls;

  return (
    <Wrapper>
      <Card title={`4 Promotion Vote Period for ${name} ${endTime}`}>
        <FlexRowSpaceBetween mb={'5px'}>
          <DataBox
            valueType="percent"
            valueSize="14px"
            title={`Participation ${formatValue(period.turnout_rolls)}`}
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
        <HorizontalProgressBar delimiter={80} settings={proposalSettings} />
        <FlexRowSpaceBetween>
          {period.yay_rolls ? (
            <DataBox
              valueType="percent"
              valueSize="14px"
              title={`YAY Rolls ${formatValue(period.yay_rolls)}`}
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
              title={`NAY Rolls ${formatValue(period.nay_rolls)}`}
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
  min-width: 340px;
  margin: 0 5px;
  font-size: 14px;
`;

export default PromotionPeriod;
