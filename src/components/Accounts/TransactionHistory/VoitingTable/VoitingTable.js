import React from 'react';
import styled from 'styled-components';
import { FlexRowSpaceBetween, DataBox, NoDataFound } from '../../../Common';
import { timeAgo, getProposaNameByHash, capitalizeFirstLetter } from '../../../../utils';
import { Link } from 'react-router-dom';
import TxTypeIcon from '../../../Common/TxTypeIcon';
import { timeFormat } from 'd3-time-format';

const VoitingTable = ({ data }) => {
  return (
    <>
      <FlexRowSpaceBetween mb={10}>
        <TableHeader width={25}>Election</TableHeader>
        <TableHeader width={25}>Vote</TableHeader>
        <TableHeader width={20}>Date</TableHeader>
        <TableHeader width={20}>Ballot</TableHeader>
        <TableHeader width={10}>Rolls</TableHeader>
      </FlexRowSpaceBetween>
      <TableBody id={'account-operations'}>
        {data.length ? (
          data.map((item, i) => {
            return (
              <FlexRowSpaceBetween key={i}>
                <TableCell width={25}>{getProposaNameByHash(item.proposal)}</TableCell>
                <TableCell width={25}>{capitalizeFirstLetter(item.voting_period_kind).replace('_vote', '')}</TableCell>
                <TableCell width={20}>
                  <DataBox title={timeFormat('%b %d, %H:%M')(item.time)} />
                </TableCell>
                <TableCell width={20}>{item.ballot.toUpperCase() || '-'}</TableCell>
                <TableCell width={10}>{item.rolls}</TableCell>
              </FlexRowSpaceBetween>
            );
          })
        ) : (
          <NoDataFound />
        )}
      </TableBody>
    </>
  );
};

const TableBody = styled.div`
  height: 200px;
  overflow: scroll;
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

const TypeCell = styled(TableCell)`
  color: #fff;
`;

export default VoitingTable;
