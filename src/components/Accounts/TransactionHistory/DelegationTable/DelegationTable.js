import React from 'react';
import styled from 'styled-components';
import { FlexRowSpaceBetween, Blockies, DataBox, NoDataFound } from '../../../Common';
import { formatCurrency, getShortHash } from '../../../../utils';
import { Link } from 'react-router-dom';
import TxTypeIcon from '../../../Common/TxTypeIcon';
import { timeFormat } from 'd3-time-format';
import { useGlobal } from 'reactn';

const DelegationTable = ({ data }) => {
  const [chain] = useGlobal('chain');
  return (
    <>
      <FlexRowSpaceBetween mb={10}>
        <TableHeader width={20}>Account</TableHeader>
        <TableHeader width={20}>Since</TableHeader>
        <TableHeader width={20}>Balance</TableHeader>
        <TableHeader width={20}>Share</TableHeader>
        <TableHeader width={20}>Status</TableHeader>
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
                  <DataBox title={timeFormat('%b %d, %H:%M')(item.time)} />
                </TableCell>
                <TableCell width={20}>{formatCurrency(item.balance)}</TableCell>
                <TableCell width={20}>{`${(item.rolls / chain.rolls).toFixed()}%`}</TableCell>
                <TableCell width={20}>{item.is_active ? 'Active' : 'Inactive'}</TableCell>
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

export default DelegationTable;
