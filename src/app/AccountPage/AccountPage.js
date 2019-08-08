import React from 'react';
import styled from 'styled-components';
import BasicAccount from '../../components/Accounts/BasicAccount';
import { getAccountByHash, getFlowData, getStakingData } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common';
import { wrapFlowData, wrapStakingData, wrapToBalance } from '../../utils';

const AccountPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });
  const currentUserHash = match.params.hash;

  React.useEffect(() => {
    const fetchData = async () => {
      let [account, flowData, stakingData, txHistory] = await Promise.all([
        getAccountByHash(currentUserHash),
        getFlowData({ hash: currentUserHash, days: 30 }),
        getStakingData({ hash: currentUserHash, days: 30 }),
      ]);

      let { stackingBond, currentDeposit, pendingReawards } = wrapStakingData({ ...stakingData, account });
      let { inFlowData, outFlowData, dataInOut } = wrapFlowData(flowData, account);
      let balanceHistory = wrapToBalance(flowData, account);

      setData({
        account,
        flowData: dataInOut,
        isLoaded: true,
        txHistory,
        balanceHistory,
        stakingData: [stackingBond, currentDeposit, pendingReawards],
      });
    };

    fetchData();
  }, [currentUserHash, match]);

  return data.isLoaded ? (
    <BasicAccount account={data.account} txHistory={data.txHistory} balanceHistory={data.balanceHistory} />
  ) : (
    <Spiner />
  );
};

export default AccountPage;
