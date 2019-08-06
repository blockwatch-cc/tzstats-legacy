import React from 'react';
import styled from 'styled-components';
import { PriceHistory } from '../../components/Home/PriceHistory/';
import { StakingSupply, CirculatingSupply } from '../../components/Home/SupplyBreakdown';
import ElectionProgress from '../../components/Home/ElectionProgress';
import AccountsGrowth from '../../components/Home/AccountsGrowth';
import { getOhlcvData } from '../../services/api/markets';
import { getElectionById, getTxVolume, getTxVolume24h } from '../../services/api/tz-stats';
import TransactionVolume from '../../components/Home/TransactionVolume';
import { Spiner } from '../../components/Common';

const Home = () => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let [priceHistory, txVol24h, txVolSeries, election] = await Promise.all([
        getOhlcvData({ days: 30 }),
        getTxVolume24h(),
        getTxVolume({ days: 30 }),
        getElectionById(),
      ]);

      setData({
        priceHistory,
        txVolSeries: txVolSeries,
        isLoaded: true,
        election,
        txVol24h: { volume: txVol24h[0], txn: txVol24h[1] },
      });
    };

    fetchData();
  }, []);
  return data.isLoaded ? (
    <Wrapper>
      <TwoElementsWrapper>
        <PriceHistory priceHistory={data.priceHistory} />
        <StakingSupply />
      </TwoElementsWrapper>
      <TwoElementsWrapper>
        <TransactionVolume txSeries={data.txVolSeries} txVol24h={data.txVol24h} />
        <CirculatingSupply />
      </TwoElementsWrapper>
      <TwoElementsWrapper>
        <AccountsGrowth />
        <ElectionProgress election={data.election} />
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
  margin-bottom: 10px;
  margin-left: -5px;
  margin-right: -5px;
`;
const Wrapper = styled.div``;

export default Home;
