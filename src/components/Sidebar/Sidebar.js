import React from 'react';
import styled from 'styled-components';
import NetworkCircle from '../NetworkCircle';
import NetworkHealth from '../NetworkHealth';
import LastBlock from '../LastBlock';
import MarketInfo from '../MarketInfo';
import { Callout } from '@blueprintjs/core';
import { Devices } from '../Common'
const Sidebar = prop => {
  return (
    <Wrraper hideOnMobile>
      <Logo>
        <a href="/">{'TzStats'}</a>
      </Logo>
      <NetworkCircle />
      <LastBlock />
      <MarketInfo />
      <NetworkHealth />
      <CalloutBox>
        <Callout intent="danger">
          You are viewing an early version of this application. The data presented may be inaccurate.
        </Callout>
      </CalloutBox>
    </Wrraper>
  );
};
const CalloutBox = styled.div`
  padding: 10px 0;
`;
const Wrraper = styled.div`
  width: 235px;
  display: flex;
  display: flex;
  flex-direction: column;
  background-color: #3b3d4a;
  padding: 0px 10px;
  @media ${Devices.mobileL} {
    ${props => props.hideOnMobile && "display: none;"}
  }
`;
const Logo = styled.div`
  padding: 20px 0;
  font-size: 18px;
  text-align: center;
  poiter: cursor;
`;
export default Sidebar;
