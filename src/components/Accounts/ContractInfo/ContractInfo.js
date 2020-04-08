import React from 'react';
import styled from 'styled-components';
import {
  Card,
  DataBox,
  HashedBox,
  FlexRowSpaceBetween,
  FlexColumnSpaceBetween,
  CopyHashButton,
  Blockies,
  Centered,
  FlexColumnSpaceAround
} from '../../Common';
import { formatValue, getAccountType } from '../../../utils';
import TzbtcInfo from './TzbtcInfo.js';
import Fa12Info from './Fa12Info.js';

const ContractInfo = ({ account, contract, token }) => {
  const accountType = getAccountType(account);

  return (
    <JoinContainer>
    <Wrapper>
      <Card title={<><Blockies hash={account.address} /><span>{accountType.name}</span></>} right={<CopyHashButton value={account.address} />}>
        <FlexRowSpaceBetween mt={10}>
          <FlexColumnSpaceBetween>
            <DataBox
              title="Last Active"
              valueType="ago"
              value={account.last_seen_time}
            />
            <DataBox
              title="Creation Date"
              valueType="date"
              value={account.first_seen_time}
            />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween>
            <DataBox
              valueType="currency-full"
              title="Balance"
              value={account.spendable_balance + account.unclaimed_balance}
            />
            <DataBox
              valueType="text"
              title="Transactions"
              value={`${formatValue(account.n_tx)}`}
            />
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween>
            {account.manager ? (
              <HashedBox hash={account.manager} isCopy={false} typeName={`Creator`} />
            ) : (
              <div>&nbsp;</div>
            )}
            {account.delegate && !account.is_delegate ? (
              <HashedBox hash={account.delegate} isCopy={false} typeName={`Delegate`} />
            ) : (
              <DataBox title="Current Delegate" valueType="text" value="-"/>
            )}
          </FlexColumnSpaceBetween>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
    <Wrapper>
      <TokenInfo token={token} />
    </Wrapper>
    </JoinContainer>
  );
};

export default ContractInfo;

const TokenInfo = ({ token }) => {
  const typ = token?token.type:null;
  switch (typ) {
  case 'tzbtc':
    return <TzbtcInfo token={token} />;
  case 'fa12':
    return <Fa12Info token={token} />;
  default:
    return (
      <Card title={'Contract Details'}>
        <FlexColumnSpaceAround flex={1}>
          <Centered mt={0} color="#ccc">We don't recognize this contract type.</Centered>
        </FlexColumnSpaceAround>
      </Card>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex: 1 auto;
  margin: 0 5px;
`;

const JoinContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-left: -5px;
  margin-right: -5px;
`;
