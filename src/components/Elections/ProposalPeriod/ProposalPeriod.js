import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Card, FlexRowSpaceBetween, DataBox, InvalidData } from '../../Common';
import { getShortHash, convertMinutes } from '../../../utils';
import { ALPHABET } from '../../../config';
import { format } from 'd3-format';

const ProposalPeriod = ({ period }) => {
  if (!period.proposals.length) {
    return <InvalidData title={'1 No one proposal'} />;
  }
  const endTime = getEndTime(period);

  return (
    <Wrapper>
      <Card title={`1 Proposal period ${endTime}`}>
        <FlexRowSpaceBetween mb={10}>
          <TableHeader width={20}>Proposal</TableHeader>
          <TableHeader width={30}>Hash</TableHeader>
          <TableHeader width={30}>Source</TableHeader>
          <TableHeader width={20}>Rolls</TableHeader>
        </FlexRowSpaceBetween>
        <TableBody>
          {period.proposals.map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell width={20}>{ALPHABET[i]}</TableCell>
                <TableCell width={30}>{getShortHash(item.hash)}</TableCell>
                <TableCell width={30}>{getShortHash(item.source)}</TableCell>
                <TableCell width={20}>{format(',')(item.rolls)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <FlexRowSpaceBetween>
          <DataBox
            valueSize="14px"
            title={`Participation Rolls ${((period.turnout_rolls / period.eligible_rolls) * 100).toFixed()}%`}
            value={period.turnout_rolls}
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
    : 'is completed';
}
const TableBody = styled.div`
  height: 120px;
  overflow: scroll;
`;
const TableRow = styled(FlexRowSpaceBetween)``;

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
  font-size: 14px;
`;
const TableHeader = styled.div`
  font-size: 12px;
  width: ${props => props.width}%;
  color: rgba(255, 255, 255, 0.52);
`;
const TableCell = styled.div`
  font-size: 12px;
  width: ${props => props.width}%;
  height: 25px;
`;

export default ProposalPeriod;
