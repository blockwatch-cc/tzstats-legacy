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
import { getChainData, getChainConfig } from '../../../services/api/tz-stats';
import { useGlobal } from 'reactn';
import useOnline from '../../../hooks/useOnline';
import {isMainnet} from "../../../utils";

const Sidebar = () => {
  const delay = React.useRef(60000);
  const [countInTimeout, setCountInTimeout] = React.useState(0);
  const [, setConfig] = useGlobal('config');
  const [chain, setChain] = useGlobal('chain');
  const isOnline = useOnline();

  React.useEffect(() => {
    const fetchData = async () => {
      function diffTime(last, offset) {
        let diff = offset - (new Date().getTime() - new Date(last).getTime());
        return diff<0?0:diff;
      }
      let timer = null;
      if (!isOnline) {
        if (countInTimeout>0) {
          setCountInTimeout(0);
        }
        return;
      }
      if (!countInTimeout) {
        // on init
        try {
          const [c, d] = await Promise.all([
            getChainConfig(),
            getChainData()
          ]);
          delay.current = c.time_between_blocks[0]*1000||60000;
          timer = setTimeout(() => {
            setCountInTimeout(c => c + 1);
          }, diffTime(d.timestamp, delay.current*1.25));
          setConfig(c);
          setChain(d);
        } catch(e) {
          // console.error(e);
          timer = setTimeout(() => {
            setCountInTimeout(c => c + 1);
          }, delay.current*1.25);
        }
      } else {
        // on update
        try {
          const d = await getChainData();
          if (d.height>chain.height) {
            timer = setTimeout(() => {
              setCountInTimeout(c => c + 1);
            }, diffTime(d.timestamp, delay.current*1.25));
          } else {
            timer = setTimeout(() => {
              setCountInTimeout(c => c + 1);
            }, diffTime(new Date(), delay.current/4));
          }
          setChain(d); // status may have changed
        } catch(e) {
          // console.error(e);
          timer = setTimeout(() => {
            setCountInTimeout(c => c + 1);
          }, diffTime(new Date(), delay.current/4));
        }
      }
      return () => clearTimeout(timer);
    };
    fetchData();
  }, [countInTimeout, isOnline]);

  return (
    <Wrapper hideOnMobile>
      <Logo />
      <NetworkCircle />
      <LastBlock />
      {isMainnet(chain)&&<MarketInfo />}
      <Election />
      <NetworkHealth />
      {chain&&chain.status.status !== 'synced'&&
        <Callout intent="danger">
          Tezos indexer {chain.status.status}. The data presented may be stale.
        </Callout>
      }
      {!isOnline&&
        <Callout intent="danger">
          TzStats is offline. Please check your network connection.
        </Callout>
      }
    </Wrapper>
  );
};
const Wrapper = styled.div`
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
