import React from 'react';
import BasicBalanceHistory from './BasicBalanceHistory';
import DelegatorBalanceHistory from './DelegatorBalanceHistory';
import BakerBalanceHistory from './BakerBalanceHistory';
import DelegationHistory from './DelegationHistory';
import { getAccountType } from '../../../utils';

const BalanceHistory = ({ account, balanceHistory, stakingData }) => {
  const accountType = getAccountType(account);
  switch (accountType.type) {
    case 'basic':
      return <BasicBalanceHistory account={account} balanceHistory={balanceHistory} />;
    case 'delegator':
      return <DelegatorBalanceHistory account={account} balanceHistory={balanceHistory} />;
    case 'baker':
      return (
        <>
          <BakerBalanceHistory account={account} balanceHistory={balanceHistory} stakingData={stakingData} />
          <DelegationHistory account={account} stakingData={stakingData} />
        </>
      );
    case 'contract':
      return <DelegatorBalanceHistory account={account} balanceHistory={balanceHistory} />;

    default:
      break;
  }
};

export default BalanceHistory;
