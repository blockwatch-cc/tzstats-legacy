import React from 'react';
import styled from 'styled-components';
import { Card, FlexRowSpaceBetween, DataBox, EmptyData, Blockies } from '../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell } from '../../Common';
import { Link } from 'react-router-dom';
import { getShortHash, getShortHashOrBakerName, getEndTime } from '../../../utils';
import { format } from 'd3-format';
import { proposals } from '../../../config/proposals';
import StartEndBlock from '../StartEndBlock';

const ProposalPeriod = ({ period }) => {
  if (!period.proposals.length) {
    return (<Wrapper><EmptyData title={'1 No proposal was submitted'} /></Wrapper>);
  }
  const endTime = getEndTime(period);

  return (
    <Wrapper>
      <Card title={`1 Proposal Period ${endTime}`}>
        <TableHeader>
          <TableHeaderCell width={20}>Proposal</TableHeaderCell>
          <TableHeaderCell width={30}>Hash</TableHeaderCell>
          <TableHeaderCell width={35}>Source</TableHeaderCell>
          <TableHeaderCell width={15}>Rolls</TableHeaderCell>
        </TableHeader>
        <TableBody height={120}>
          {period.proposals.map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell width={20}>
                  <OutLink target="_blank" href={proposals[item.hash].link}>
                    {proposals[item.hash].name.split(" ").slice(-1)}
                  </OutLink>
                </TableCell>
                <TableCell width={30}>
                  <OutLink target="_blank" href={proposals[item.hash].archive}>
                    {getShortHash(item.hash)}
                  </OutLink>
                </TableCell>
                <TableCell width={35}>
                  <Blockies hash={item.source} />
                  <Link to={`/account/${item.source}`}>{getShortHashOrBakerName(item.source)}</Link>
                </TableCell>
                <TableCell width={15}>{format(',')(item.rolls)}</TableCell>
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
          <StartEndBlock period={period} />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const OutLink = styled.a`
  border-bottom: 1px solid transparent;
  &:hover{
    border-bottom: 1px dotted #fff;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
  font-size: 14px;
`;

export default ProposalPeriod;
