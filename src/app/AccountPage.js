import React from 'react';
import BalanceHistory from '../components/Accounts/BalanceHistory';
import TransactionHistory from '../components/Accounts/TransactionHistory';
import AccountInfo from '../components/Accounts/AccountInfo';
import { getAccountByHash, getFlowData, getStakingData } from '../services/api/tz-stats';
import { Spinner, NotFound, Error } from '../components/Common';
import { wrapStakingData, wrapToBalance, getHashOrBakerName, getBakerName, buildTitle } from '../utils';
import { useGlobal } from 'reactn';

const AccountPage = ({ match }) => {
  const last = React.useRef({ last_seen: 0, address: null });
  const [data, setData] = React.useState({ isLoaded: false, wait: false });
  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');
  const addr = match.params.hash;

  React.useEffect(() => {
    document.title = buildTitle(config, 'Account', getHashOrBakerName(addr));
  }, [config, addr]);

  const load = React.useCallback(async () => {
    try {
      let account = await getAccountByHash(addr);
      if (last.current.address !== account.address || last.current.last_seen < account.last_seen) {
        let [flowData, stakingData] = await Promise.all([
          getFlowData({ hash: addr, days: 30 }),
          getStakingData({ hash: addr, days: 30 }),
        ]);
        let staking = wrapStakingData({ ...stakingData, account });
        let balance = wrapToBalance(flowData, account);
        setData({
          account,
          isLoaded: true,
          balance,
          staking,
        });
      } else {
        setData(data => {
          return {
            isLoaded: true,
            balance: data.balance,
            staking: data.staking,
            account: account,
          };
        });
      }
      last.current.last_seen = account.last_seen;
      last.current.address = account.address;
    } catch (e) {
      switch (e.status) {
        case 502:
        case 504:
          return;
        case 404:
          setData({
            isLoaded: true,
            wait: true,
          });
          break;
        default:
          setData({
            isLoaded: true,
            error: e,
          });
      }
    }
  }, [addr]);

  React.useEffect(() => {
    if (chain.height) {
      load();
    }
  }, [chain.height, load]);

  switch (true) {
    case !data.isLoaded:
      return <Spinner />;
    case !!data.error:
      return <Error err={data.error} />;
    case data.wait:
      return <NotFound reloadFunc={load} type="account" hash={addr} />;
    default:
      return (
        <>
          <h1>{getBakerName(addr)||'Account'}</h1>
          <AccountInfo account={data.account} />
          <BalanceHistory account={data.account} balance={data.balance} staking={data.staking} />
          <TransactionHistory account={data.account} />
        </>
      );
  }
};

export default AccountPage;
