import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowSpaceBetween, Blockies } from '../../Common';
import { timeAgo, getShortHash, formatCurrency } from '../../../utils';
import { Link } from 'react-router-dom';
import TxTypeIcon from '../../Common/TxTypeIcon';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

const TransactionHistory = ({ txHistory }) => {
  // const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOperations);
  // function fetchMoreOperations() {

  //   if (tableData.length != allOperations.length) {
  //     const sliceIndex = allOperations.length - tableData.length < 10
  //       ? allOperations.length
  //       : tableData.length + 10
  //     let newTableData = allOperations.slice(tableData.length, sliceIndex);
  //     setTableData(prevState => ([...prevState, ...newTableData]));
  //     setIsFetching(false);
  //   }
  // }
  return (
    <Wrapper>
      <Card title={'Transaction History'}>
        <FlexRowSpaceBetween mb={10}>
          <TableHeader width={30}>Details</TableHeader>
          <TableHeader width={20}>To</TableHeader>
          <TableHeader width={15}>Amount</TableHeader>
          <TableHeader width={15}>Fees</TableHeader>
          <TableHeader width={20}>Hash</TableHeader>
        </FlexRowSpaceBetween>

        {txHistory.map((item, i) => {
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
              <TableCell width={15}>{`${item.volume} ꜩ`}</TableCell>
              <TableCell width={15}>{`${item.fee} ꜩ`}</TableCell>
              <TableCell width={20}>
                <HashLink to={`/operation/${item.op_hash}`}>{getShortHash(item.op_hash)}</HashLink>
              </TableCell>
            </FlexRowSpaceBetween>
          );
        })}
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Details = styled.span`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
`;
const HashLink = styled(Link)`
  color: #26b2ee;
`;

const TableCell = styled.div`
  font-size: 12px;
  width: ${props => props.width}%;
  height: 25px;
`;
const TypeCell = styled(TableCell)`
  color: #fff;
`;
const TableHeader = styled.div`
  font-size: 12px;
  width: ${props => props.width}%;
  color: rgba(255, 255, 255, 0.52);
`;

export default TransactionHistory;
