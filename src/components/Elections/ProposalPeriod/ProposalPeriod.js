import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Card, FlexRowSpaceBetween, DataBox } from '../../Common';
import { getShortHash, convertMinutes } from '../../../utils';
import { format } from 'd3-format';
import EmptyPeriod from '../EmptyPeriod/EmptyPeriod';

const ProposalPeriod = ({ period }) => {
  if (!period.proposals.length) {
    return <EmptyPeriod title={'1 No one proposal'} />;
  }
  const endTime = getEndTime(period);

  return (
    <Wrapper>
      <Card title={`1 Proposal period ${endTime}`}>
        <FlexRowSpaceBetween mb={10}>
          <TableHeader>Proposal</TableHeader>
          <TableHeader>Hash</TableHeader>
          <TableHeader>Source</TableHeader>
          <TableHeader>Rolls</TableHeader>
        </FlexRowSpaceBetween>
        <TableBody>
          {period.proposals.map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{i}</TableCell>
                <TableCell>{getShortHash(item.hash)}</TableCell>
                <TableCell>{getShortHash(item.source)}</TableCell>
                <TableCell>{item.rolls}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <FlexRowSpaceBetween>
          <DataBox valueSize="14px" title="Participation Rolls" value={period.turnout_rolls} />
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
const TableBody = styled.div`
  height: 120px;
  overflow: scroll;
`;
const TableRow = styled(FlexRowSpaceBetween)`
  &:hover {
    color: #26b2ee;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
  font-size: 14px;
`;

const TableCell = styled.div`
  font-size: 12px;
  height: 25px;
  min-width: 35px;
`;
const TableHeader = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.52);
`;

export default ProposalPeriod;
