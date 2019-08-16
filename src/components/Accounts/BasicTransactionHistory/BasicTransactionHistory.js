import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRowSpaceBetween, Blockies, FlexRow } from '../../Common';
import { timeAgo, getShortHash, formatCurrency } from '../../../utils';
import { Link } from 'react-router-dom';
import TxTypeIcon from '../../Common/TxTypeIcon';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { getAccountOperations } from '../../../services/api/tz-stats';
const BasicTransactionHistory = ({ hash }) => {
  const [isOutgoing, setIsOutgoing] = React.useState({ isOutgoing: true });
  const [operations, setOperations] = React.useState([]);
  const [tableOperations, setTableOperations] = React.useState([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOperations, 'main-panel');

  function fetchMoreOperations() {
    if (tableOperations.length != operations.length) {
      const sliceIndex =
        operations.length - tableOperations.length < 10 ? operations.length : tableOperations.length + 10;
      let newTableData = operations.slice(tableOperations.length, sliceIndex);
      setIsFetching(false);
      setTableOperations(prevState => [...prevState, ...newTableData]);
    }
  }

  const handelClick = isOutgoing => {
    setIsOutgoing(isOutgoing);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const operations = await getAccountOperations({ hash, type: isOutgoing ? 'sender' : 'receiver' });
      setTableOperations(operations.slice(0, 10));
      setOperations(operations);
    };

    fetchData();
  }, [hash, isOutgoing]);

  return (
    <Wrapper>
      <Card title={'Transaction History'}>
        <FlexRow mb={10}>
          <Button active={isOutgoing} onClick={e => handelClick(true)}>
            Outgoing Transactions
          </Button>
          <Button active={!isOutgoing} onClick={e => handelClick(false)}>
            Incoming Transactions
          </Button>
        </FlexRow>
        <FlexRowSpaceBetween mb={10}>
          <TableHeader width={30}>Details</TableHeader>
          <TableHeader width={20}>To</TableHeader>
          <TableHeader width={15}>Amount</TableHeader>
          <TableHeader width={15}>Fees</TableHeader>
          <TableHeader width={20}>Hash</TableHeader>
        </FlexRowSpaceBetween>

        {tableOperations.map((item, i) => {
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

const Button = styled.div`
  height: 24px;
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid #6f727f;
  background-color: ${props => (props.active ? '#525566' : '#424553')};
  cursor: pointer;
`;

const Wrapper = styled.div``;
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

export default BasicTransactionHistory;
