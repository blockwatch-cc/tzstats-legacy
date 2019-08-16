import React from 'react';
import styled from 'styled-components';
import AccountInfo from '../AccountInfo';
import BakerBalanceHistory from '../BakerBalanceHistory';
import BakerTransactionHistory from '../BakerTransactionHistory';

const BakerAccount = ({ account, balanceHistory, txHistory }) => {
  return (
    <Wrapper>
      <AccountInfo account={account} />
      <BakerBalanceHistory account={account} balanceHistory={balanceHistory} />
      <BakerTransactionHistory hash={account.address} />
    </Wrapper>
  );
};

export default BakerAccount;

const Wrapper = styled.div``;
