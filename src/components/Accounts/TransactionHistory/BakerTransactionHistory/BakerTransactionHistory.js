import React from 'react';
import styled from 'styled-components';
import { Card, FlexRow } from '../../../Common';
import DelegationTable from '../DelegationTable';
import AccountManagmentTable from '../AccountManagmentTable';
import BakingRightsTable from '../BakingRightsTable';
import TransactionTable from '../TransactionTable';
import VotingTable from '../VotingTable';

const BakerTransactionHistory = ({ account }) => {
  const [data, setData] = React.useState({ tab: 'rights' });
  const handleClick = async tab => {
    setData({
      tab: tab,
    });
  };

  return (
    <Wrapper>
      <Card>
        <ButtonRow>
          <Button active={data.tab === 'rights'} onClick={e => handleClick('rights')}>
            {account.n_origination?'Baking & Rights':'Baking History & Rights'}
          </Button>
          <Button active={data.tab === 'delegation'} onClick={e => handleClick('delegation')}>
            Delegators
          </Button>
          {account.n_origination ? (
          <Button active={data.tab === 'managed'} onClick={e => handleClick('managed')}>
            Managed Accounts
          </Button>
          ):''}
          <Button active={data.tab === 'incoming'} onClick={e => handleClick('incoming')}>
            Incoming Transactions
          </Button>
          <Button active={data.tab === 'outgoing'} onClick={e => handleClick('outgoing')}>
            Outgoing Transactions
          </Button>
          <Button active={data.tab === 'other'} onClick={e => handleClick('other')}>
            {account.n_origination?'Other Ops':'Other Operations'}
          </Button>
          <Button active={data.tab === 'votes'} onClick={e => handleClick('votes')}>
            {account.n_origination?'Voting':'Voting History'}
          </Button>
        </ButtonRow>
        <OperationsTable type={data.tab} account={account} />
      </Card>
    </Wrapper>
  );
};

const OperationsTable = ({ type, account }) => {
  switch (type) {
    case 'delegation':
      return <DelegationTable account={account} />;
    case 'managed':
      return <AccountManagmentTable account={account} />;
    case 'incoming':
      return <TransactionTable account={account} incoming={true} type={"transaction"} />;
    case 'outgoing':
      return <TransactionTable account={account} incoming={false} type={"transaction"} />;
    case 'other':
      return <TransactionTable account={account} incoming={false} type={type} />;
    case 'votes':
      return <VotingTable account={account} />;
    case 'rights':
      return <BakingRightsTable account={account} />;
    default:
      return <></>;
  }
};

const ButtonRow = styled(FlexRow)`
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
  margin-bottom: 20px;
`;

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
