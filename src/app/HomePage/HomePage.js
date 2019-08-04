import React from 'react';
import styled from 'styled-components';
import { PriceHistory } from '../../components/PriceHistory/';
import { StakingSupply, CirculatingSupply } from '../../components/SupplyBreakdown';
import { ElectionProgress } from '../../components/Ellections';
import AccountsGrowth from '../../components/AccountsGrowth';
import { getOhlcvData } from '../../services/api/markets';
import { getElectionById, getTxVolume, getTxVolume24h } from '../../services/api/tz-stats';
import { wrapTxs } from '../../utils';
import TransactionVolume from '../../components/TransactionVolume';
import { Spiner } from '../../components/Common'

const Home = () => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {

      let [priceHistory, txVol24h, txVolSeries, election] = await Promise.all([
        getOhlcvData({ days: 30 }),
        getTxVolume24h(),
        getTxVolume({ days: 30 }),
        getElectionById()
      ]);

      setData({
        priceHistory,
        txVolSeries: txVolSeries,
        isLoaded: true,
        election,
        txVol24h: { volume: txVol24h[0], txn: txVol24h[1] }
      });

    };

    fetchData();
  }, []);
  return (

    data.isLoaded ?
      (
        <Wrapper>
          <JoinContainer>
            <PriceHistory priceHistory={data.priceHistory} />
            <StakingSupply />
          </JoinContainer>
          <JoinContainer>
            <TransactionVolume txSeries={data.txVolSeries} txVol24h={data.txVol24h} />
            <CirculatingSupply />
          </JoinContainer>
          <JoinContainer>
            <AccountsGrowth />
            <ElectionProgress election={data.election} />
          </JoinContainer>
        </Wrapper>
      ) :
      <Spiner />
  );
};

const JoinContainer = styled.div`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 0 -5px;
      `;
const Wrapper = styled.div``;

export default Home;


