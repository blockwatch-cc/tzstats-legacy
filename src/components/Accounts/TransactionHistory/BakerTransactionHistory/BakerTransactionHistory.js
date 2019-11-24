import React from 'react';
import styled from 'styled-components';
import { Card, Tabs, Tab } from '../../../Common';
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
        <Tabs>
          <Tab active={data.tab === 'perf'} onClick={e => handleClick('perf')}>
            Performance
          </Tab>
          <Tab active={data.tab === 'rewards'} onClick={e => handleClick('rewards')}>
            Rewards
          </Tab>
          <Tab active={data.tab === 'bonds'} onClick={e => handleClick('bonds')}>
            Bonds
          </Tab>
          <Tab active={data.tab === 'baking'} onClick={e => handleClick('baking')}>
            Baking
          </Tab>
          <Tab active={data.tab === 'endorsing'} onClick={e => handleClick('endorsing')}>
            Endorsing
          </Tab>
          <Tab active={data.tab === 'votes'} onClick={e => handleClick('votes')}>
            Votes
          </Tab>
          <Tab active={data.tab === 'delegation'} onClick={e => handleClick('delegation')}>
            Delegators
          </Tab>
          {account.n_origination ? (
            <Tab active={data.tab === 'contracts'} onClick={e => handleClick('contracts')}>
              Contracts
            </Tab>
          ) : (
            ''
          )}
          <Tab active={data.tab === 'outgoing'} onClick={e => handleClick('outgoing')}>
            Sent
          </Tab>
          <Tab active={data.tab === 'incoming'} onClick={e => handleClick('incoming')}>
            Received
          </Tab>
          <Tab active={data.tab === 'other'} onClick={e => handleClick('other')}>
            Other
          </Tab>
        </Tabs>
        <OperationsTable type={data.tab} account={account} />
      </Card>
    </Wrapper>
  );
};

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

const Wrapper = styled.div``;

export default BakerTransactionHistory;
