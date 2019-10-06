import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import BlockHistory from '../../components/Blocks/BlockHistory';
import { PriceHistory } from '../../components/Home/PriceHistory/';
import CirculatingSupply from '../../components/Home/CirculatingSupply';
import StakingInfo from '../../components/Home/StakingInfo';
import ElectionProgress from '../../components/Home/ElectionProgress';
import AccountsGrowth from '../../components/Home/AccountsGrowth';
import { getOhlcvData } from '../../services/api/markets';
import { isMainnet } from '../../utils';
import { getElectionById, getTxVolume, getBlockTimeRange, getBlockHeight, unwrapBlock } from '../../services/api/tz-stats';
import TransactionVolume from '../../components/Home/TransactionVolume';
import { FlexColumn, Spiner } from '../../components/Common';

// @echa: FIXME dynamic data loading using timeouts and data watchers in react is a clusterfuck!
// I have no idea how to fix this.
const Home = () => {
  const [data, setData] = React.useState({ isLoaded: false });
  const [loadAllCounter, setLoadAllCounter] = React.useState(new Date().getTime());
  const [config] = useGlobal('config');
  const [chain] = useGlobal('chain');

  React.useEffect(() => {
    const fetchData = async () => {
      let now = new Date().getTime();
      const last = new Date(chain.timestamp).getTime();
      const sixtyblocks = 60*config.time_between_blocks[0]*1000;
      if (now - last > sixtyblocks) {
        now = last;
      }
      let [priceHistory, txVolSeries, election, blocks] = await Promise.all([
        isMainnet(config)?getOhlcvData({ days: 30 }):null,
        getTxVolume({ start:now===last?last-30*86400*1000:null, days: 30 }),
        getElectionById(),
        getBlockTimeRange(now-sixtyblocks, now),
      ]);

      setData({
        priceHistory,
        txVolSeries: txVolSeries,
        isLoaded: true,
        election,
        blocks,
        currentBlock:unwrapBlock(blocks.slice(-1)[0])
      });
    };
    if (config.version && chain.timestamp) {
      // console.log("Running full reload",loadAllCounter, config.time_between_blocks, config.version);
   		fetchData();
   	}
  }, [config, chain, loadAllCounter]);

  React.useEffect(() => {
    const fetchData = async () => {
      let newblock = await getBlockHeight(chain.height);
      let now = new Date().getTime();
      const last = new Date(chain.timestamp).getTime();
      const sixtyblocks = 60*config.time_between_blocks[0]*1000;
      if (now - last > sixtyblocks) {
        now = last;
      }
      let blocks = data.blocks.filter(b => now - (new Date(b[0]).getTime())<=sixtyblocks);
      blocks.push(newblock[0]);
      setData({
        priceHistory: data.priceHistory,
        txVolSeries: data.txVolSeries,
        isLoaded: true,
        election: data.election,
      	blocks: blocks,
        currentBlock: unwrapBlock(newblock[0])
      });
    };
    if (!chain.height||!data.currentBlock||data.currentBlock.height===chain.height) {
    	return;
    }
    // we reload all state when
    // - older than 10 minutes
    // - detecing a gap
    // - detecting a reorg
    let full = chain.height>data.currentBlock.height+1;
    // if (chain.height>data.currentBlock.height+1) { console.log("Need full reload after gap", chain.height,data.currentBlock.height);}
    full = full || new Date(chain.timestamp).getTime() - loadAllCounter > 10*60000;
    // if (new Date(chain.timestamp).getTime() - loadAllCounter > 10*60000) { console.log("Need full reload at reorg after 10min");}
    full = full || data.currentBlock.parent_id!==data.blocks.slice(-2)[0][5];
    // if (data.currentBlock.parent_id!==data.blocks.slice(-2)[0][5]) { console.log("Need full reload at reorg", data.currentBlock, data.blocks.slice(-2));}
    switch (chain.status.status) {
    case "synced":
      if (full) {
        setLoadAllCounter(new Date().getTime());
      } else {
        fetchData();
      }
      break;
    default:
      // skip on init and when syncing (will be triggered by sidebar)
      break;
    }
  }, [config.time_between_blocks, chain, loadAllCounter, data]);


  return data.isLoaded ? (
    <Wrapper>
      <BlockHistory blockHistory={data.blocks} lastBlock={data.currentBlock} />
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
        <TransactionVolume txSeries={data.txVolSeries} />
      </TwoElementsWrapper>
      <TwoElementsWrapper>
        <CirculatingSupply />
        <AccountsGrowth />
      </TwoElementsWrapper>
    </Wrapper>
  ) : (
    <Spiner />
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
