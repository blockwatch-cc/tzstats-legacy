import React from 'react';
import styled from 'styled-components';
import BlockHistory from '../../components/Blocks/BlockHistory';
import { PriceHistory } from '../../components/Home/PriceHistory/';
import CirculatingSupply from '../../components/Home/CirculatingSupply';
import StakingInfo from '../../components/Home/StakingInfo';
import ElectionProgress from '../../components/Home/ElectionProgress';
import AccountsGrowth from '../../components/Home/AccountsGrowth';
import { getOhlcvData } from '../../services/api/markets';
import { getElectionById, getTxVolume, getBlockTimeRange, unwrapBlock } from '../../services/api/tz-stats';
import TransactionVolume from '../../components/Home/TransactionVolume';
import { FlexColumn, Spiner } from '../../components/Common';

const Home = () => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const now = new Date().setSeconds(0,0);
    const fetchData = async () => {
      let [priceHistory, txVolSeries, election, blocks] = await Promise.all([
        getOhlcvData({ days: 30 }),
        getTxVolume({ days: 30 }),
        getElectionById(),
        getBlockTimeRange(now-3600000, now+60000),
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

    fetchData();
  }, []);
  return data.isLoaded ? (
    <Wrapper>
      <BlockHistory blockHistory={data.blocks} lastBlock={data.currentBlock} />
      <TwoElementsWrapper>
        <PriceHistory priceHistory={data.priceHistory} />
        <FlexColumn>
          <StakingInfo />
          <ElectionProgress election={data.election} />
        </FlexColumn>
      </TwoElementsWrapper>
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
