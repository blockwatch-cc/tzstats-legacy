import React from 'react';
import BalanceHistory from '../components/Accounts/BalanceHistory';
import TransactionHistory from '../components/Accounts/TransactionHistory';
import AccountInfo from '../components/Accounts/AccountInfo';
import { getAccountByHash, getFlowData, getStakingData } from '../services/api/tz-stats';
import { Spiner } from '../components/Common';
import { wrapStakingData, wrapToBalance } from '../utils';
import history from '../hooks/history';

const AccountPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      const addr = match.params.hash;
      try {
        let [account, flowData, stakingData] = await Promise.all([
          getAccountByHash(addr),
          getFlowData({ hash: addr, days: 30 }),
          getStakingData({ hash: addr, days: 30 }),
        ]);

        let staking = wrapStakingData({ ...stakingData, account });
        let balanceHistory = wrapToBalance(flowData, account);
        setData({
          account,
          isLoaded: true,
          balanceHistory,
          staking,
        });
      } catch (e) {
        console.log(e, 'errror');
        if (e.status === 404) {
          history.push('/404/' + addr);
        }
      }
    };

    fetchData();
  }, [match.params.hash]);

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
