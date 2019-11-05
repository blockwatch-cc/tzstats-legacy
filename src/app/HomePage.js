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
import { isMainnet, buildTitle } from '../utils';
import {
  getElectionById,
  getTxVolume,
  getTxVolume24h,
} from '../services/api/tz-stats';
import TransactionVolume from '../components/Home/TransactionVolume';
import { FlexColumn, Spinner } from '../components/Common';

// @echa: FIXME dynamic data loading using timeouts and data watchers in react is a clusterfuck!
// I have no idea how to fix this.
const Home = () => {
  const [data, setData] = React.useState({ isLoaded: false });
  const [lastBlockTime, setLastBlockTime] = React.useState(0);
  const [config] = useGlobal('config');
  const [chain] = useGlobal('chain');

  React.useEffect(() => {
    document.title = buildTitle(config, 'Block Explorer');
    const fetchData = async () => {
      let now = parseInt(new Date().getTime() / 1000) * 1000; // round to seconds
      now += now % 60000; // round up now to the next full minute
      const last = lastBlockTime;
      const sixtyblocks = 60 * config.time_between_blocks[0] * 1000;
      if (now - last > sixtyblocks) {
        now = last;
      }
      let [priceHistory, txVolSeries, txVol24h, election] = await Promise.all([
        isMainnet(config) ? getOhlcvData({ days: 30, collapse: '6h', limit: 30 * 4 }) : null,
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
    };
    if (config.version && lastBlockTime) {
      // console.log("Running full reload",lastBlockTime, config.time_between_blocks, config.version);
      fetchData();
    }
  }, [config, lastBlockTime]);

  React.useEffect(() => {
    // we reload all state on init and every 10 min
    let nowChain = new Date(chain.timestamp);
    let full = !data.isLoaded || nowChain - new Date() > 10 * 60000;
    if (full && chain.status.status === 'synced') {
      setLastBlockTime(nowChain.getTime());
    }
  }, [chain.timestamp, chain.status, setLastBlockTime, data.isLoaded]);

  return data.isLoaded ? (
    <Wrapper>
      <BlockHistory />
      {isMainnet(config) ? (
        <TwoElementsWrapper>
          <PriceHistory priceHistory={data.priceHistory} />
          <FlexColumn>
            <StakingInfo />
            <ElectionProgress election={data.election} />
          </FlexColumn>
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
  ) : (
    <Spinner />
  );
};

const TwoElementsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-left: -5px;
  margin-right: -5px;
`;
const Wrapper = styled.div``;

export default Home;
