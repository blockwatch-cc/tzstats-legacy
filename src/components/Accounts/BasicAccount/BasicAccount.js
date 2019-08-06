import React from 'react';
import styled from 'styled-components';
import AccountInfo from '../AccountInfo';
import BalanceHistory from '../BalanceHistory';
import TransactionHistory from '../TransactionHistory';

const BasicAccount = ({ account, balanceHistory, txHistory }) => {
  return (
    <Wrapper>
      <AccountInfo account={account} />
      <BalanceHistory account={account} balanceHistory={balanceHistory} />
      <TransactionHistory txHistory={txHistory} />
    </Wrapper>
  );
};

export default BasicAccount;

const Wrapper = styled.div``;
