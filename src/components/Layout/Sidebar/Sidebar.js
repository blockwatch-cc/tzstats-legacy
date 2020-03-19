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
import { enableMarket, getAliases } from '../../../config';
import Footer from '../Footer';

const Sidebar = () => {
  const delay = React.useRef(60000);
  const waiting = React.useRef(false);
  const [countInTimeout, setCountInTimeout] = React.useState(0);
  const [, setConfig] = useGlobal('config');
  const [chain, setChain] = useGlobal('chain');
  const isOnline = useOnline();

  React.useEffect(() => {
    const fetchData = async () => {
      function diffTime(last, offset) {
        let diff = offset - (new Date().getTime() - new Date(last).getTime());
        diff = diff + (Math.random() * offset) / 10 - offset / 20; // +/-10% offset random
        return diff < 0 ? 15000 : diff;
      }
      function setTimer(d) {
        waiting.current = true;
        return setTimeout(() => {
          waiting.current = false;
          setCountInTimeout(c => c + 1);
        }, d);
      }
      let timer = null;
      if (!isOnline) {
        if (countInTimeout > 0) {
          setCountInTimeout(0);
        }
      } else if (!waiting.current && !countInTimeout) {
        // on init
        try {
          const [c, d] = await Promise.all([getChainConfig(), getChainData()]);
          delay.current = c.time_between_blocks[0] * 1000 || 60000;
          timer = setTimer(diffTime(d.timestamp, delay.current * 1.25));
          getAliases(c); // init network-specific aliases
          setConfig(c);
          setChain(d);
        } catch (e) {
          timer = setTimer(delay.current * 1.25);
        }
      } else if (!waiting.current) {
        // on update
        try {
          const d = await getChainData();
          if (d.height > chain.height) {
            timer = setTimer(diffTime(d.timestamp, delay.current * 1.25));
          } else {
            timer = setTimer(diffTime(new Date(), delay.current / 4));
          }
          setChain(d); // status may have changed
        } catch (e) {
          timer = setTimer(diffTime(new Date(), delay.current / 4));
        }
      }
      return () => clearTimeout(timer);
    };
    fetchData();
  }, [chain.height, countInTimeout, isOnline, setChain, setConfig, waiting]);

  return (
    <Wrapper hideOnMobile>
      <Logo />
      <NetworkCircle />
      <LastBlock />
      {enableMarket && <MarketInfo />}
      <Election />
      <NetworkHealth />
      {chain && chain.status.status !== 'synced' && (
        <Callout intent="danger">Tezos indexer {chain.status.status}. The data presented may be stale.</Callout>
      )}
      {!isOnline && <Callout intent="danger">TzStats is offline. Please check your network connection.</Callout>}
      <Stretch />
      <Footer />
    </Wrapper>
  );
};

const Stretch = styled.div`
  flex-grow: 1;
  -webkit-flex-grow: 1;
  -webkit-flex: 2 0 0;
`;

const Wrapper = styled.div`
  min-width: 220px;
  max-width: 220px;
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
