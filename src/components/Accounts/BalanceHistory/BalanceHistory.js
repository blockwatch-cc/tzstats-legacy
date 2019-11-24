import React from 'react';
import styled from 'styled-components';
import BasicBalanceHistory from './BasicBalanceHistory';
import BakerBalanceHistory from './BakerBalanceHistory';
import DelegationHistory from './DelegationHistory';
import { EmptyData } from '../../Common';
import { getAccountType } from '../../../utils';

const BalanceHistory = ({ account, balance, staking }) => {
  const accountType = getAccountType(account);
  switch (accountType.type) {
    case 'basic':
      return (
        <JoinContainer>
          <BasicBalanceHistory account={account} balance={balance} />
          <Wrapper>
            <EmptyData
              title={'How to delegate?'}
              height={212}
              text={
                'The account is not participating in staking right now. To start earning rewards on all funds you can securely delegate rights to a staking service or register as a delegate.'
              }
            />
          </Wrapper>
        </JoinContainer>
      );
    case 'delegator':
      return (
        <JoinContainer>
          <BasicBalanceHistory account={account} balance={balance} />
          <Wrapper>
            <EmptyData title={'Payout History'} height={212} text={'Work in progress...'} />
          </Wrapper>
        </JoinContainer>
      );
    case 'baker':
      return (
        <JoinContainer>
          <BakerBalanceHistory account={account} balance={balance} staking={staking} />
          <DelegationHistory account={account} staking={staking} />
        </JoinContainer>
      );
    case 'contract':
      return (
        <JoinContainer>
          <BasicBalanceHistory account={account} balance={balance} />
        </JoinContainer>
      );
    default:
      break;
  }
};

export default BalanceHistory;
const JoinContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -5px;
`;

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
`;
