import React from 'react';
import BasicTransactionHistory from './BasicTransactionHistory';
import BakerTransactionHistory from './BakerTransactionHistory';
import { getAccountType } from '../../../utils';

const TransactionHistory = ({ account }) => {
  const accountType = getAccountType(account);

  switch (accountType.type) {
    case 'basic':
      return <BasicTransactionHistory account={account} />;
    case 'delegator':
      return <BasicTransactionHistory account={account} />;
    case 'baker':
      return <BakerTransactionHistory account={account} />;
    case 'contract':
      return <BasicTransactionHistory account={account} />;

    default:
      break;
  }
};

export default TransactionHistory;
