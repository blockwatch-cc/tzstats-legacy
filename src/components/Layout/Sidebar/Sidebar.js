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

const Sidebar = () => {
  return (
    <Wrraper hideOnMobile>
      <Logo>
        <Link to="/">{'TzStats'}</Link>
      </Logo>
      <MarketInfo />
      <LastBlock />
      <NetworkCircle />
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
  display: flex;
  display: flex;
  flex-direction: column;
  background-color: #3b3d4a;
  padding: 0px 10px;
  @media ${Devices.mobileL} {
    ${props => props.hideOnMobile && 'display: none;'}
  }
`;
const Logo = styled.div`
  padding: 20px 0;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
`;
export default Sidebar;
