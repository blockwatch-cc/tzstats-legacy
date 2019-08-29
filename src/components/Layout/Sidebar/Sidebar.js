import React from 'react';
import styled from 'styled-components';
import NetworkCircle from './NetworkCircle';
import NetworkHealth from './NetworkHealth';
import LastBlock from './LastBlock';
import Election from './Election';
import MarketInfo from './MarketInfo';
import { Callout } from '@blueprintjs/core';
import { Devices } from '../../Common';
import Logo from './Logo';
import { getChainData } from '../../../services/api/tz-stats';
import { setGlobal } from 'reactn';

const Sidebar = () => {
  const [countInTimeout, setCountInTimeout] = React.useState(0);

  //After update chain data after 1 minute
  React.useEffect(() => {
    setTimeout(() => {
      setCountInTimeout(countInTimeout + 1);
    }, 60000);
  }, [countInTimeout]);

  React.useEffect(() => {
    const fetchData = async () => {
      const chainData = await getChainData();

      setGlobal({ chain: chainData });
    };
    fetchData();
  }, [countInTimeout]);

  return (
    <Wrraper hideOnMobile>
      <Logo />
      <NetworkCircle />
      <LastBlock />
      <MarketInfo />
      <Election />
      <NetworkHealth />
      <Callout intent="danger">
        You are viewing an early version of this application. The data presented may be inaccurate.
      </Callout>
    </Wrraper>
  );
};
const Wrraper = styled.div`
  width: 220px;
  min-height: 100vh;
  display: flex;
  display: flex;
  flex-direction: column;
  background-color: #444755;
  padding: 0px 10px;
  @media ${Devices.mobileL} {
    ${props => props.hideOnMobile && 'display: none;'}
  }
`;
export default Sidebar;
