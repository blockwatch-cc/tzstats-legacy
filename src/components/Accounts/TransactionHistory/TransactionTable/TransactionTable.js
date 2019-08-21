import React from 'react';
import styled from 'styled-components';
import { FlexRowSpaceBetween, Blockies, NoDataFound } from '../../../Common';
import { timeAgo, getShortHash } from '../../../../utils';
import { Link } from 'react-router-dom';
import TxTypeIcon from '../../../Common/TxTypeIcon';

const TransactionTable = ({ data }) => {
  return (
    <>
      <FlexRowSpaceBetween mb={10}>
        <TableHeader width={30}>Details</TableHeader>
        <TableHeader width={20}>To</TableHeader>
        <TableHeader width={20}>Amount</TableHeader>
        <TableHeader width={20}>Fees</TableHeader>
        <TableHeader width={10}>Hash</TableHeader>
      </FlexRowSpaceBetween>
      <TableBody id={'account-operations'}>
        {data && data.length ? (
          data.map((item, i) => {
            return (
              <FlexRowSpaceBetween key={i}>
                <TypeCell width={30}>
                  <TxTypeIcon isSuccess={item.is_success} type={item.op_type} />
                  <Details>{`Transaction ${timeAgo.format(new Date(item.time))}`}</Details>
                </TypeCell>
                <TableCell width={20}>
                  <Blockies hash={item.receiver} />
                  <HashLink to={`/account/${item.receiver}`}>{getShortHash(item.receiver)}</HashLink>
                </TableCell>
                <TableCell width={20}>{`${item.volume} ꜩ`}</TableCell>
                <TableCell width={20}>{`${item.fee} ꜩ`}</TableCell>
                <TableCell width={10}>
                  <HashLink to={`/operation/${item.op_hash}`}>{getShortHash(item.op_hash)}</HashLink>
                </TableCell>
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
const NoData = styled.div`
  margin: 20px 0;
  color: rgba(255, 255, 255, 0.52);
`;
const Details = styled.span`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
`;
const HashLink = styled(Link)`
  color: #26b2ee;
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

export default TransactionTable;
