import React from 'react';
import styled from 'styled-components';
import { PriceHistory } from '../../components/PriceHistory/';
import { StakingSupply, CirculatingSupply } from '../../components/SupplyBreackdown';
import VoitingProgress from '../../components/VoitingProgress';
import AccountsGrowth from '../../components/AccountsGrowth';
import { getMarketData } from '../../services/api/blockwatch';
import { getVoitingData, getTxsData, getLastBlockTxData } from '../../services/api/tz-stats';
import { wrapTxs } from '../../utils';
import TransactionVoume from '../../components/TransactionVoume';
import { Spiner } from '../../components/Common'

const Home = () => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {

      let [priceHistory, txDataLast, txData, voiting] = await Promise.all([
        getMarketData({ days: 30 }),
        getLastBlockTxData(),
        getTxsData({ days: 30 }),
        getVoitingData()
      ]);
      const trasactionVolume = wrapTxs(txData);

      setData({
        priceHistory,
        txs: trasactionVolume,
        isLoaded: true,
        voiting,
        txData: { volume: txDataLast[1], txn: txDataLast[2] }
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
            <TransactionVoume data={data.txs} txData={data.txData} />
            <CirculatingSupply />
          </JoinContainer>
          <JoinContainer>
            <AccountsGrowth />
            <VoitingProgress voiting={data.voiting} />
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


