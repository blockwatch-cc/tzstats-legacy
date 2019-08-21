import React from 'react';
import BasicTransactionHistory from './BasicTransactionHistory';
import BakerTransactionHistory from './BakerTransactionHistory';
import { getAccountType } from '../../../utils';

const TransactionHistory = ({ account }) => {
  const accountType = getAccountType(account);

  switch (accountType.type) {
    case 'basic':
      return <BasicTransactionHistory hash={account.address} />;
    case 'delegator':
      return <BasicTransactionHistory hash={account.address} />;
    case 'baker':
      return <BakerTransactionHistory account={account} />;
    case 'contract':
      return <BasicTransactionHistory hash={account.address} />;

    default:
      break;
  }
};

export default TransactionHistory;
