import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import BlockHistory from '../components/Blocks/BlockHistory';
import { PriceHistory } from '../components/Home/PriceHistory/';
import CirculatingSupply from '../components/Home/CirculatingSupply';
import StakingInfo from '../components/Home/StakingInfo';
import ElectionProgress from '../components/Home/ElectionProgress';
import AccountsGrowth from '../components/Home/AccountsGrowth';
import { getOhlcvData } from '../services/api/markets';
import { enableMarket } from '../config';
import {
  getElectionById,
  getTxVolume,
  getTxVolume24h,
} from '../services/api/tz-stats';
import TransactionVolume from '../components/Home/TransactionVolume';
import { Spinner, Error, Centered, Devices } from '../components/Common';
import { useMetaTags, isMainnet } from '../hooks/useMetaTags';

// @echa: FIXME dynamic data loading using timeouts and data watchers in react is a clusterfuck!
// I have no idea how to fix this.
const Home = () => {
  const [data, setData] = React.useState({ isLoaded: false, wait: false });
  const [lastBlockTime, setLastBlockTime] = React.useState(0);
  const [config] = useGlobal('config');
  const [chain] = useGlobal('chain');
  const net = isMainnet(config) ? '' : config.network;
  useMetaTags('TzStats - Tezos ' + net + ' Block Explorer', '', 'by Blockwatch');

  React.useEffect(() => {
    let timer = null;
    const fetchData = async () => {
      let now = parseInt(new Date().getTime() / 1000) * 1000; // round to seconds
      now += now % 60000; // round up now to the next full minute
      const last = lastBlockTime;
      const sixtyblocks = 60 * config.time_between_blocks[0] * 1000;
      if (now - last > sixtyblocks) {
        now = last;
      }
      try {
        let [priceHistory, txVolSeries, txVol24h, election] = await Promise.all([
          enableMarket ? getOhlcvData({ days: 30, collapse: '6h', limit: 30 * 4 }) : null,
          getTxVolume({ start: now === last ? last - 30 * 86400 * 1000 : null, days: 30 }),
          getTxVolume24h(),
          getElectionById(),
        ]);

        setData({
          isLoaded: true,
          priceHistory,
          txVolSeries,
          txVol24h,
          election,
        });
      } catch (e) {
        console.error(e);
        switch (e.status) {
        case 502:
        case 504:
          timer = setTimeout(() => {
            setLastBlockTime(c => c - 1);
          }, 10000);
          break;
        default:
          setData({
            isLoaded: true,
            error: e,
          });
        }
      }
    };
    if (config.version && lastBlockTime) {
      // console.log("Running full reload",lastBlockTime, config.time_between_blocks, config.version);
      fetchData();
    }
    return () => clearTimeout(timer);
  }, [config, lastBlockTime]);

  React.useEffect(() => {
    switch (chain.status.status) {
    case 'synced':
    case 'offline':
      break;
    default:
      setData({
        isLoaded: true,
        wait: true,
      });
      return;
    }
    // we reload all state on init and every 10 min
    let nowChain = new Date(chain.timestamp);
    let full = !data.isLoaded || nowChain - new Date() > 10 * 60000;
    if (full) {
      setLastBlockTime(nowChain.getTime());
    }
  }, [chain.timestamp, chain.status, setLastBlockTime, data.isLoaded]);

  switch (true) {
  case !data.isLoaded:
    return <Spinner />;
  case !!data.error:
    return <Error err={data.error} />;
  case !!data.wait:
      return (
        <Centered>
          <H1>The TzStats indexer is {chain.status.status} right now.</H1>
          <H2>Please hold on!</H2>
        </Centered>
        );
  default:
    return (
      <Wrapper>
        <BlockHistory />
        {enableMarket ? (
          <TwoElementsWrapper>
            <PriceHistory priceHistory={data.priceHistory} />
            <TwoElementsColumn>
              <StakingInfo />
              <ElectionProgress election={data.election} />
            </TwoElementsColumn>
          </TwoElementsWrapper>
        ) : (
          <TwoElementsWrapper>
            <StakingInfo />
            <ElectionProgress election={data.election} />
          </TwoElementsWrapper>
        )}
        <TwoElementsWrapper>
          <TransactionVolume txSeries={data.txVolSeries} txVol24h={data.txVol24h} />
        </TwoElementsWrapper>
        <TwoElementsWrapper>
          <CirculatingSupply />
          <AccountsGrowth />
        </TwoElementsWrapper>
      </Wrapper>
    );
  }
};

const TwoElementsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-left: -5px;
  margin-right: -5px;
`;
const Wrapper = styled.div``;

const TwoElementsColumn = styled.div`
  display: flex;
  flex-direction: column;
  @media ${Devices.mobileM} {
    flex-grow: 1;
  }
`;

const H1 = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const H2 = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-size: 1.2em;
`;


export default Home;
