import React from 'react';
import BalanceHistory from '../../components/Accounts/BalanceHistory';
import TransactionHistory from '../../components/Accounts/TransactionHistory';
import AccountInfo from '../../components/Accounts/AccountInfo';
import { getAccountByHash, getFlowData, getStakingData, getAccountIncome } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common';
import { wrapStakingData, wrapToBalance } from '../../utils';

const AccountPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });
  const currentUserHash = match.params.hash;

  React.useEffect(() => {
    const fetchData = async () => {
      let [account, flowData, stakingData] = await Promise.all([
        getAccountByHash(currentUserHash),
        getFlowData({ hash: currentUserHash, days: 30 }),
        getStakingData({ hash: currentUserHash, days: 30 }),
      ]);

      let staking = wrapStakingData({ ...stakingData, account });

      let balanceHistory = wrapToBalance(flowData, account);

      setData({
        account,
        isLoaded: true,
        balanceHistory,
        staking,
      });
    };

    fetchData();
  }, [currentUserHash, match]);

  return data.isLoaded ? (
    <>
      <AccountInfo account={data.account} />
      <BalanceHistory account={data.account} balanceHistory={data.balanceHistory} stakingData={data.staking} />
      <TransactionHistory account={data.account} />
    </>
  ) : (
    <Spiner />
  );
};

export default AccountPage;
