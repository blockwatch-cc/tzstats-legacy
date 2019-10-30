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
  getBlockTimeRange,
  getBlockHeight,
  unwrapBlock,
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
      // const last = new Date(chain.timestamp).getTime();
      const sixtyblocks = 60 * config.time_between_blocks[0] * 1000;
      if (now - last > sixtyblocks) {
        now = last;
      }
      let [priceHistory, txVolSeries, txVol24h, election, blocks] = await Promise.all([
        isMainnet(config) ? getOhlcvData({ days: 30, collapse: '6h', limit: 30 * 4 }) : null,
        getTxVolume({ start: now === last ? last - 30 * 86400 * 1000 : null, days: 30 }),
        getTxVolume24h(),
        getElectionById(),
        getBlockTimeRange(last - sixtyblocks, now),
      ]);

      setData({
        isLoaded: true,
        priceHistory,
        txVolSeries,
        txVol24h,
        election,
        blocks,
        currentBlock: unwrapBlock(blocks.slice(-1)[0]),
      });
    };
    if (config.version && lastBlockTime) {
      // console.log("Running full reload",lastBlockTime, config.time_between_blocks, config.version);
      fetchData();
    }
  }, [config, lastBlockTime]);

  React.useEffect(() => {
    const fetchData = async () => {
      // console.log("Single block load",chain.height);
      let newblock = await getBlockHeight(chain.height);
      let now = parseInt(new Date().getTime() / 1000) * 1000;
      now += now % 60000; // round up now to the next full minute
      const last = new Date(chain.timestamp).getTime();
      const sixtyblocks = 60 * config.time_between_blocks[0] * 1000;
      if (now - last > sixtyblocks) {
        now = last;
      }
      let blocks = data.blocks.filter(b => now - new Date(b[0]).getTime() <= sixtyblocks);
      blocks.push(newblock[0]);
      setData(d => {
        return {
          isLoaded: true,
          priceHistory: d.priceHistory,
          txVolSeries: d.txVolSeries,
          txVol24h: d.txVol24h,
          election: d.election,
          blocks: blocks,
          currentBlock: unwrapBlock(newblock[0]),
        };
      });
    };
    // nothing to do without a new block
    if (!chain.height || (data.currentBlock && data.currentBlock.height === chain.height)) {
      // console.log("No new block", chain.height, data);
      return;
    }
    // we reload all state when
    // - on init
    // - older than 10 minutes
    // - detecing a gap
    // - detecting a reorg
    let full = !data.currentBlock;
    // if (full) { console.log("Need full load on init", chain.height, chain.timestamp); }
    if (!full) {
      full = full || chain.height > data.currentBlock.height + 1;
      // if (chain.height>data.currentBlock.height+1) { console.log("Need full reload after gap", chain.height,data.currentBlock.height);}
      full = full || new Date(chain.timestamp).getTime() - lastBlockTime > 10 * 60000;
      // if (new Date(chain.timestamp).getTime() - lastBlockTime > 10*60000) { console.log("Need full reload after 10min");}
      full = full || data.currentBlock.parent_id !== data.blocks.slice(-2)[0][5];
      // if (data.currentBlock.parent_id!==data.blocks.slice(-2)[0][5]) { console.log("Need full reload at reorg", data.currentBlock, data.blocks.slice(-2));}
    }
    switch (chain.status.status) {
      case 'synced':
        if (full) {
          setLastBlockTime(new Date(chain.timestamp).getTime());
        } else {
          fetchData();
        }
        break;
      default:
        // skip on init and when syncing (will be triggered by sidebar)
        break;
    }
  }, [config.time_between_blocks, chain, lastBlockTime, data]);

  return data.isLoaded ? (
    <Wrapper>
      <BlockHistory blockHistory={data.blocks} lastBlock={data.currentBlock} />
      {isMainnet(config) ? (
        <TwoElementsWrapper>
          <PriceHistory priceHistory={data.priceHistory} />
          <FlexColumn flex={1}>
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
