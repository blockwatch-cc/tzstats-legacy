import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Card, FlexRowSpaceBetween, DataBox, EmptyData, Blockies } from '../../Common';
import { Link } from 'react-router-dom';
import { getShortHash, getEndTime } from '../../../utils';
import { ALPHABET } from '../../../config';
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
        <FlexRowSpaceBetween mb={10}>
          <TableHeader width={20}>Proposal</TableHeader>
          <TableHeader width={30}>Hash</TableHeader>
          <TableHeader width={35}>Source</TableHeader>
          <TableHeader width={15}>Rolls</TableHeader>
        </FlexRowSpaceBetween>
        <TableBody>
          {period.proposals.map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell width={20}>
                  <UnderlineLink target="_blank" href={proposals[item.hash].archive}>
                    {proposals[item.hash].name.split(" ").slice(-1)}
                  </UnderlineLink>
                </TableCell>
                <TableCell width={30}>
                  <UnderlineLink target="_blank" href={proposals[item.hash].link}>
                    {getShortHash(item.hash)}
                  </UnderlineLink>
                </TableCell>
                <TableCell width={35}>
                  <Blockies hash={item.source} />
                  <HashLink to={`/account/${item.source}`}>{getShortHash(item.source)}</HashLink>
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

const TableBody = styled.div`
  height: 120px;
  overflow: scroll;
`;
const TableRow = styled(FlexRowSpaceBetween)``;
const HashLink = styled(Link)`
  color: #26b2ee;
`;

const UnderlineLink = styled.a`
  text-decoration: underline;
`;

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
