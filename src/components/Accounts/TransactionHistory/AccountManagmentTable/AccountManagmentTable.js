import React from 'react';
import styled from 'styled-components';
import { FlexRowSpaceBetween, Blockies, DataBox, NoDataFound } from '../../../Common';
import { timeAgo, getShortHash } from '../../../../utils';
import { Link } from 'react-router-dom';
import TxTypeIcon from '../../../Common/TxTypeIcon';
import { timeFormat } from 'd3-time-format';

const AccountManagmentTable = ({ data }) => {
  return (
    <>
      <FlexRowSpaceBetween mb={10}>
        <TableHeader width={20}>Account</TableHeader>
        <TableHeader width={20}>Created</TableHeader>
        <TableHeader width={20}>Last Seen</TableHeader>
        <TableHeader width={15}>Balance</TableHeader>
        <TableHeader width={15}>Delegate</TableHeader>
        <TableHeader width={10}>Status</TableHeader>
      </FlexRowSpaceBetween>
      <TableBody id={'account-operations'}>
        {data.length ? (
          data.map((item, i) => {
            return (
              <FlexRowSpaceBetween key={i}>
                <TableCell width={20}>
                  <Blockies hash={item.account} />
                  <HashLink to={`/account/${item.account}`}>{getShortHash(item.account)}</HashLink>
                </TableCell>
                <TableCell width={20}>
                  <DataBox title={timeFormat('%b %d, %H:%M')(item.first_in_time)} />
                </TableCell>
                <TableCell width={20}>
                  <DataBox title={timeFormat('%b %d, %H:%M')(item.last_seen_time)} />
                </TableCell>
                <TableCell width={15}>{item.spendable_balance}</TableCell>
                <TableCell width={15}>
                  <Blockies hash={item.delegate} />
                  <HashLink to={`/account/${item.delegate}`}>{getShortHash(item.delegate)}</HashLink>
                </TableCell>
                <TableCell width={10}>{item.is_active ? 'Active' : 'Inactive'}</TableCell>
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
const NoData = styled.div`
  margin: 20px 0;
  color: rgba(255, 255, 255, 0.52);
  margin: 75px auto;
`;
const TableBody = styled.div`
  height: 200px;
  overflow: scroll;
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

export default AccountManagmentTable;
