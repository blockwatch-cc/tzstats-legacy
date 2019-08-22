import React from 'react';
import styled from 'styled-components';
import { Card, FlexRow } from '../../../Common';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { getTableDataByType, getAccountRights, getAccountIncome } from '../../../../services/api/tz-stats';
import DelegationTable from '../DelegationTable';
import AccountManagmentTable from '../AccountManagmentTable';
import BakingRightsTable from '../BakingRightsTable';
import TransactionTable from '../TransactionTable';
import VoitingTable from '../VoitingTable';
import { useGlobal } from 'reactn';

//Todo refactoring
const BakerTransactionHistory = ({ account }) => {
  const [data, setData] = React.useState({ opType: null, operations: [], tableData: [], isLoaded: false });
  const [accountIncome, setAccountIncome] = React.useState({ inCome: [], rights: [] });
  const [chain] = useGlobal('chain');
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOperations, 'account-operations');

  //toDo make it with normal paging;
  function fetchMoreOperations() {
    if (data.tableData.length !== data.operations.length) {
      const sliceIndex =
        data.operations.length - data.tableData.length < 10 ? data.operations.length : data.tableData.length + 10;
      let newTableData = data.operations.slice(data.tableData.length, sliceIndex);

      setData(prevState => {
        return {
          opType: prevState.opType,
          operations: prevState.operations,
          tableData: [...prevState.tableData, ...newTableData],
        };
      });
    }
  }

  const handelClick = async type => {
    if (type) {
      let ops = await getTableDataByType({ type, address: account.address, cycle: chain.cycle });
      ops = ops.reverse();
      setData({
        opType: type,
        operations: ops,
        isLoaded: true,
        tableData: [...ops.slice(0, 10)],
      });
    } else {
      let rights = await getAccountRights({ address: account.address, cycle: chain.cycle });
      setData({
        opType: type,
        isLoaded: true,
        operations: [],
        tableData: rights,
      });
      return;
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      let [rights, inCome] = await Promise.all([
        getAccountRights({ address: account.address, cycle: chain.cycle }),
        getAccountIncome({ address: account.address, cycle: chain.cycle }),
      ]);

      setAccountIncome(inCome);
      setData({
        opType: null,
        operations: [],
        tableData: rights,
        isLoaded: true,
      });
    };

    fetchData();
  }, [account, chain.cycle]);

  return data.isLoaded ? (
    <Wrapper>
      <Card title={'Transaction History'}>
        <FlexRow mb={30}>
          <Button active={data.opType == null} onClick={e => handelClick(null)}>
            Baking History & Rights
          </Button>
          <Button active={data.opType === 'delegation'} onClick={e => handelClick('delegation')}>
            Delegators
          </Button>
          <Button active={data.opType === 'managment'} onClick={e => handelClick('managment')}>
            Managed Accounts
          </Button>
          <Button active={data.opType === 'incoming'} onClick={e => handelClick('incoming')}>
            Outgoing Transactions
          </Button>
          <Button active={data.opType === 'outcoming'} onClick={e => handelClick('outcoming')}>
            Incoming Transactions
          </Button>
          <Button active={data.opType === 'proposals'} onClick={e => handelClick('proposals')}>
            Voting History
          </Button>
        </FlexRow>
        <OperationsTable type={data.opType} tableData={data.tableData} account={account} income={accountIncome} />
      </Card>
    </Wrapper>
  ) : (
    ''
  );
};

const OperationsTable = ({ type, tableData, account, income }) => {
  switch (type) {
    case 'delegation':
      return <DelegationTable data={tableData} account={account} />;
    case 'managment':
      return <AccountManagmentTable data={tableData} />;
    case 'incoming':
      return <TransactionTable data={tableData} />;
    case 'outcoming':
      return <TransactionTable data={tableData} />;
    case 'proposals':
      return <VoitingTable data={tableData} />;
    default:
      return <BakingRightsTable income={income} tableData={tableData} account={account} />;
  }
};

const Button = styled.div`
  height: 24px;
  font-size: 12px;
  padding: 4px 14px;
  border: 1px solid #6f727f;
  background-color: ${props => (props.active ? '#525566' : '#424553')};
  cursor: pointer;
`;

const Wrapper = styled.div``;

export default BakerTransactionHistory;
