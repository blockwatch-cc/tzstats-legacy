import React from 'react';
import styled from 'styled-components';
import { Card, FlexRow } from '../../../Common';
import DelegationTable from '../DelegationTable';
import ContractsTable from '../ContractsTable';
import PerformanceTable from '../PerformanceTable';
import TransactionTable from '../TransactionTable';
import RightsTable from '../RightsTable';
import RewardsTable from '../RewardsTable';
import BondsTable from '../BondsTable';
import BakingTable from '../BakingTable';
import EndorsingTable from '../EndorsingTable';
import VotingTable from '../VotingTable';

const BakerTransactionHistory = ({ account }) => {
  const [data, setData] = React.useState({ tab: 'perf' });
  const handleClick = async tab => {
    setData({ tab: tab });
  };

  return (
    <Wrapper>
      <Card>
        <ButtonRow>
          <Button active={data.tab === 'perf'} onClick={e => handleClick('perf')}>
            Performance
          </Button>
          <Button active={data.tab === 'rewards'} onClick={e => handleClick('rewards')}>
            Rewards
          </Button>
          <Button active={data.tab === 'bonds'} onClick={e => handleClick('bonds')}>
            Bonds
          </Button>
          <Button active={data.tab === 'baking'} onClick={e => handleClick('baking')}>
            Baking
          </Button>
          <Button active={data.tab === 'endorsing'} onClick={e => handleClick('endorsing')}>
            Endorsing
          </Button>
          <Button active={data.tab === 'votes'} onClick={e => handleClick('votes')}>
            Votes
          </Button>
          <Button active={data.tab === 'delegation'} onClick={e => handleClick('delegation')}>
            Delegators
          </Button>
          {account.n_origination ? (
            <Button active={data.tab === 'contracts'} onClick={e => handleClick('contracts')}>
              Contracts
            </Button>
          ) : (
            ''
          )}
          <Button active={data.tab === 'outgoing'} onClick={e => handleClick('outgoing')}>
            Sent
          </Button>
          <Button active={data.tab === 'incoming'} onClick={e => handleClick('incoming')}>
            Received
          </Button>
          <Button active={data.tab === 'other'} onClick={e => handleClick('other')}>
            Other
          </Button>
        </ButtonRow>
        <OperationsTable type={data.tab} account={account} />
      </Card>
    </Wrapper>
  );
};

// <Button active={data.tab === 'rights'} onClick={e => handleClick('rights')}>
//   Rights
// </Button>

const OperationsTable = ({ type, account }) => {
  switch (type) {
    case 'perf':
      return <PerformanceTable account={account} />;
    case 'rewards':
      return <RewardsTable account={account} />;
    case 'bonds':
      return <BondsTable account={account} />;
    case 'baking':
      return <BakingTable account={account} />;
    case 'endorsing':
      return <EndorsingTable account={account} />;
    case 'rights':
      return <RightsTable account={account} />;
    case 'delegation':
      return <DelegationTable account={account} />;
    case 'votes':
      return <VotingTable account={account} />;
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
