import React from 'react';
import styled from 'styled-components';
import NetworkCircle from './NetworkCircle';
import NetworkHealth from './NetworkHealth';
import LastBlock from './LastBlock';
import Election from './Election';
import MarketInfo from './MarketInfo';
import { Callout } from '@blueprintjs/core';
import { Devices } from '../../Common';
import { Link } from 'react-router-dom';
import Logo from './Logo';
const Sidebar = () => {
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

