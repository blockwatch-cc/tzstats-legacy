import React from 'react';
import styled from 'styled-components';
import { Card, Tabs, Tab } from '../../Common';
import { formatValue } from '../../../utils';
import CallTable from './CallTable';
import HolderTable from './HolderTable';
import TransferTable from './TransferTable';
import EntrypointTable from './EntrypointTable';
import StorageTable from './StorageTable';

const ContractTabs = ({ contract, token }) => {
  const [data, setData] = React.useState({ tab: !!token.type?'holders':'calls' });
  const handleClick = tab => {
    setData({ tab: tab });
  };

  return (
    <Wrapper>
      <Card>
        <Tabs>
          {token.type?(
          <>
            <Tab active={data.tab === 'holders'} onClick={e => handleClick('holders')}>
              Holders
            </Tab>
            <Tab active={data.tab === 'transfers'} onClick={e => handleClick('transfers')}>
              Transfers
            </Tab>
          </>
          ):''}
          <Tab active={data.tab === 'calls'} onClick={e => handleClick('calls')}>
            Calls
          </Tab>
          <Tab active={data.tab === 'entry'} onClick={e => handleClick('entry')}>
            Entrypoints
          </Tab>
          <Tab active={data.tab === 'store'} onClick={e => handleClick('store')}>
            Storage
          </Tab>
          {contract.bigmap_ids.map((item, i) => {
            return (
              <Tab key={i} active={data.tab === item} onClick={e => handleClick(item)}>
                Bigmap {formatValue(item, ',')}
              </Tab>
            )
          })}
        </Tabs>
        <OperationsTable token={token} contract={contract} type={data.tab} />
      </Card>
    </Wrapper>
  );
};

const OperationsTable = ({ type, contract, token }) => {
  switch (type) {
    case 'holders':
      return <HolderTable token={token} />;
    case 'transfers':
      return <TransferTable token={token} />;
    case 'calls':
      return <CallTable contract={contract} incoming={true} type={'transaction'} />;
    case 'entry':
      return <EntrypointTable contract={contract} token={token} />;
    case 'store':
      return <StorageTable contract={contract} token={token} />;
    default:
      return <></>;
  }
};

const Wrapper = styled.div``;

export default ContractTabs;
