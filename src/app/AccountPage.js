import React from 'react';
import BalanceHistory from '../components/Accounts/BalanceHistory';
import TransactionHistory from '../components/Accounts/TransactionHistory';
import AccountInfo from '../components/Accounts/AccountInfo';
import ContractInfo from '../components/Accounts/ContractInfo';
import ContractTabs from '../components/Accounts/ContractTabs';
import { getAccountByHash, getContract, getBalanceFlow, getStakingFlows, makeToken } from '../services/api/tz-stats';
import { Spinner, NotFound, Error } from '../components/Common';
import { wrapStakingData, wrapToBalance, getShortHashOrBakerName, getBakerName } from '../utils';
import { useGlobal } from 'reactn';
import { useMetaTags } from '../hooks/useMetaTags';

const AccountPage = ({ match }) => {
  const last = React.useRef({ last_seen: 0, address: null });
  const [data, setData] = React.useState({ isLoaded: false, wait: false });
  const [chain] = useGlobal('chain');
  const addr = match.params.hash;
  useMetaTags('', getShortHashOrBakerName(addr));

  const load = React.useCallback(async () => {
    try {
      let account = await getAccountByHash(addr);
      if (last.current.address !== account.address || last.current.last_seen < account.last_seen) {
        let [flowData, stakingData, contract] = await Promise.all([
          getBalanceFlow({ hash: addr, days: 30 }),
          getStakingFlows({ hash: addr, days: 30 }),
          account.is_contract?getContract(addr):null,
        ]);
        let staking = wrapStakingData({ ...stakingData, account });
        let balance = wrapToBalance(flowData, account);
        // async load token after bigmap id is known
        let token = account.is_contract?await makeToken(addr, contract.bigmap_ids):null
        setData({
          account,
          isLoaded: true,
          balance,
          staking,
          contract,
          token,
        });
      } else {
        setData(data => {
          return {
            isLoaded: true,
            balance: data.balance,
            staking: data.staking,
            account: account,
            contract: data.contract,
            token: data.token,
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
    case data.account.is_contract:
      return (
        <>
          <h1>{getBakerName(addr)||'Contract'}</h1>
          <ContractInfo account={data.account} contract={data.contract} token={data.token} />
          <ContractTabs account={data.account} contract={data.contract} token={data.token} />
        </>
      );
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
