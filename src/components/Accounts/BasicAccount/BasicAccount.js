import React from 'react';
import styled from 'styled-components';
import AccountInfo from '../AccountInfo';
import BasicBalanceHistory from '../BasicBalanceHistory';
import BasicTransactionHistory from '../BasicTransactionHistory';

const BasicAccount = ({ account, balanceHistory }) => {
  return (
    <Wrapper>
      <AccountInfo account={account} />
      <BasicBalanceHistory account={account} balanceHistory={balanceHistory} />
      <BasicTransactionHistory hash={account.address} />
    </Wrapper>
  );
};

export default BasicAccount;

const Wrapper = styled.div``;
