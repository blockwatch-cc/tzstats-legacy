import React from 'react';
import styled from 'styled-components';
import { Card, FlexRow } from '../../../Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { getAccountOperations } from '../../../../services/api/tz-stats';
import TransactionTable from '../TransactionTable';

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
      const operations = await getAccountOperations({ address: hash, type: isOutgoing ? 'sender' : 'receiver' });
      operations.reverse();
      setTableOperations(operations.slice(0, 10));
      setOperations(operations);
    };

    fetchData();
  }, [hash, isOutgoing]);

  return (
    <Wrapper>
      <Card title={'Transaction History'}>
        <FlexRow mb={30}>
          <Button active={isOutgoing} onClick={e => handelClick(true)}>
            Outgoing Transactions
          </Button>
          <Button active={!isOutgoing} onClick={e => handelClick(false)}>
            Incoming Transactions
          </Button>
        </FlexRow>
        <TransactionTable data={tableOperations} />
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

export default BasicTransactionHistory;
