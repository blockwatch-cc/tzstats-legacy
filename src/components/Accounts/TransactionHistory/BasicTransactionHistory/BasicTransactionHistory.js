import React from 'react';
import styled from 'styled-components';
import { Card, FlexRow } from '../../../Common';
import TransactionTable from '../TransactionTable';
import AccountManagmentTable from '../AccountManagmentTable';

const BasicTransactionHistory = ({ account }) => {
  const [data, setData] = React.useState({ tab: 'incoming' });
  const handleClick = tab => {
    setData({ tab: tab });
  };

  return (
    <Wrapper>
      <Card>
        <FlexRow mb={30}>
          <Button active={data.tab === 'incoming'} onClick={e => handleClick('incoming')}>
            Incoming Transactions
          </Button>
          <Button active={data.tab === 'outgoing'} onClick={e => handleClick('outgoing')}>
            Outgoing Transactions
          </Button>
          <Button active={data.tab === 'other'} onClick={e => handleClick('other')}>
            Other Operations
          </Button>
          {account.n_origination ? (
            <Button active={data.tab === 'managed'} onClick={e => handleClick('managed')}>
              Managed Accounts
            </Button>
          ) : (
            ''
          )}
        </FlexRow>
        <OperationsTable account={account} type={data.tab} />
      </Card>
    </Wrapper>
  );
};

const OperationsTable = ({ type, account }) => {
  switch (type) {
    case 'managed':
      return <AccountManagmentTable account={account} />;
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
