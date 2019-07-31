import React from 'react';
import styled from 'styled-components';
import AccountInfo from '../../components/AccountInfo';
import AccountBalance from '../../components/AccountBalance';
import BalanceHistory from '../../components/BalanceHistory';
import StakingBond from '../../components/StakingBond';
import { getAccountByHash, getFlowData, getStakingData } from '../../services/api/tz-stats';
import { Spiner } from '../../components/Common'
import { wrapFlowData, wrapStakingData } from '../../utils';

const PrivacyPage = ({ match }) => {
  return (<div></div>)
}
export default PrivacyPage;



