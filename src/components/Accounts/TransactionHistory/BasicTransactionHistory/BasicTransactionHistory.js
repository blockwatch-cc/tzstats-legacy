import React from 'react';
import styled from 'styled-components';
import { Card, FlexRow } from '../../../Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { getAccountOperations } from '../../../../services/api/tz-stats';
import TransactionTable from '../TransactionTable';

const BasicTransactionHistory = ({ hash }) => {
  const [data, setData] = React.useState({ isLoaded: false, operations: [], tableData: [], isOutgoing: true });
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOperations, 'account-operations');

  function fetchMoreOperations() {
    if (data.tableData.length !== data.operations.length) {
      const sliceIndex =
        data.operations.length - data.tableData.length < 10 ? data.operations.length : data.tableData.length + 10;
      let newTableData = data.operations.slice(data.tableData.length, sliceIndex);
      setIsFetching(false);
      setData(prevState => {
        prevState.tableData = [...prevState.tableData, ...newTableData];
        return prevState;
      });
    }
  }

  const handelClick = async isOutgoing => {
    const operations = await getAccountOperations({ address: hash, type: data.isOutgoing ? 'sender' : 'receiver' });
    setData({
      operations,
      isLoaded: true,
      tableData: operations.slice(0, 10),
      isOutgoing,
    });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      let operations = await getAccountOperations({ address: hash, type: data.isOutgoing ? 'sender' : 'receiver' });
      operations = operations.reverse();
      setData({
        operations,
        isLoaded: true,
        tableData: operations.slice(0, 10),
        isOutgoing: true,
      });
    };

    fetchData();
  }, [data.isOutgoing, hash]);

  return (
    <Wrapper>
      <Card title={'Transaction History'}>
        <FlexRow mb={30}>
          <Button active={data.isOutgoing} onClick={e => handelClick(data.isOutgoing)}>
            Outgoing Transactions
          </Button>
          <Button active={!data.isOutgoing} onClick={e => handelClick(!data.isOutgoing)}>
            Incoming Transactions
          </Button>
        </FlexRow>
        <TransactionTable data={data.tableData} />
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
