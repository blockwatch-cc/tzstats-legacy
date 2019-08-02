import React from 'react';
import styled from 'styled-components';
import AccountInfo from '../../components/AccountInfo';
import AccountBalance from '../../components/AccountBalance';
import BalanceHistory from '../../components/BalanceHistory';
import StakingBond from '../../components/StakingBond';
import { getAccountByHash, getFlowData, getStakingData } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common'
import { wrapFlowData, wrapStakingData } from '../../utils';

const AccountPage = ({ match }) => {
  const [data, setData] = React.useState({ isLoaded: false });
  const currentUserHash = match.params.hash;

  React.useEffect(() => {
    const fetchData = async () => {

      let [account, stakingData] = await Promise.all([
        getAccountByHash(currentUserHash),
        // getFlowData({ hash: currentUserHash, days: 30 }),
        getStakingData({ hash: currentUserHash, days: 30 })
      ]);

      let { stakingBond, currentDeposit, pendingRewards } = wrapStakingData({ ...stakingData, account })
      let { inFlowData, outFlowData, dataInOut } = wrapFlowData(stakingData.balance, account);

      setData({
        account,
        flowData: dataInOut,
        isLoaded: true,
        stakingData: [stakingBond, currentDeposit, pendingRewards]
      });
    };

    fetchData();
  }, [match]);

  return (
    data.isLoaded ?
      (
        <Wrapper>
          <TwoElementsWrapper>
            <AccountInfo {...data.account} />
            <AccountBalance {...data.account} />
          </TwoElementsWrapper>
          <BalanceHistory {...data} />
          {data.account.is_delegate && <StakingBond data={data.stakingData} account={data.account} />}
        </Wrapper>
      ) :
      <Spiner />
  )
};
const Wrapper = styled.div``;
const TwoElementsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-left: -5px;
  margin-right: -5px;
`;
export default AccountPage;



