import React from 'react';
import styled from 'styled-components';
import { Card, Tabs, Tab } from '../../../Common';
import TransactionTable from '../TransactionTable';
import ContractsTable from '../ContractsTable';

const BasicTransactionHistory = ({ account }) => {
  const [data, setData] = React.useState({ tab: 'incoming' });
  const handleClick = tab => {
    setData({ tab: tab });
  };

  return (
    <Wrapper>
      <Card>
        <Tabs>
          <Tab active={data.tab === 'incoming'} onClick={e => handleClick('incoming')}>
            Received
          </Tab>
          <Tab active={data.tab === 'outgoing'} onClick={e => handleClick('outgoing')}>
            Sent
          </Tab>
          <Tab active={data.tab === 'other'} onClick={e => handleClick('other')}>
            Other
          </Tab>
          <Tab active={data.tab === 'contracts'} onClick={e => handleClick('contracts')}>
            Contracts
          </Tab>
        </Tabs>
        <OperationsTable account={account} type={data.tab} />
      </Card>
    </Wrapper>
  );
};

const OperationsTable = ({ type, account }) => {
  switch (type) {
    case 'contracts':
      return <ContractsTable account={account} />;
    case 'incoming':
      return <TransactionTable account={account} incoming={true} type={'transaction'} />;
    case 'outgoing':
      return <TransactionTable account={account} incoming={false} type={'transaction'} />;
    case 'other':
      return <TransactionTable account={account} incoming={false} type={type} />;
    default:
      return <></>;
  }
};


const Wrapper = styled.div``;

export default BasicTransactionHistory;
