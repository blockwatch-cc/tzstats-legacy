import React from 'react';
import styled from 'styled-components';
import { Card, FlexRowSpaceBetween, DataBox, EmptyData, Blockies } from '../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell } from '../../Common';
import { Link } from 'react-router-dom';
import { getShortHash, getShortHashOrBakerName, getEndTime, formatValue } from '../../../utils';
import { format } from 'd3-format';
import { getProposalByHash } from '../../../config/proposals';


const ProposalPeriod = ({ election, period }) => {
  if (!period.proposals.length) {
    return (<Wrapper><EmptyData title={'1 No proposal was submitted'} text={election.is_open&&`Approximately ${getEndTime(period, 'period_end_time')}`} mh={250} /></Wrapper>);
  }
  const endTime = getEndTime(period);

  return (
    <Wrapper>
      <Card title={`1 Proposal Period ${endTime}`} mh={250}>
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
                  <OutLink target="_blank" rel="noopener noreferrer" href={getProposalByHash(item.hash).link}>
                    {getProposalByHash(item.hash).name.split(" ").slice(-1)}
                  </OutLink>
                </TableCell>
                <TableCell width={30}>
                  <OutLink target="_blank" rel="noopener noreferrer" href={getProposalByHash(item.hash).archive}>
                    {getShortHash(item.hash)}
                  </OutLink>
                </TableCell>
                <TableCell width={35}>
                  <Blockies hash={item.source} />
                  <Link to={`/${item.source}`}>{getShortHashOrBakerName(item.source)}</Link>
                </TableCell>
                <TableCell width={15}>{format(',')(item.rolls)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <FlexRowSpaceBetween flex={1} alignItems="flex-end">
          <DataBox
            valueType="percent"
            valueSize="14px"
            valueOpts={{digits:2,zero:'0%'}}
            title={`Participation (${formatValue(period.turnout_rolls)} rolls - ${formatValue(period.turnout_voters)}/${formatValue(period.eligible_voters)} voters)`}
            value={period.turnout_rolls / period.eligible_rolls}
          />
          <DataBox
            valueType="percent"
            valueSize="14px"
            ta="right"
            valueOpts={{digits:2,zero:'-'}}
            title={`Quorum (${formatValue(period.quorum_rolls)} rolls)`}
            value={period.quorum_pct/10000}
          />
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
  min-width: 300px;
  margin: 0 5px;
  font-size: 14px;
`;

export default ProposalPeriod;
