import React from 'react';
import styled from 'styled-components';
import PriceHistory from '../../components/PriceHistory/';
import { StakingSupply, CirculatingSupply } from '../../components/SupplyBreackdown';
import VoitingProgress from '../../components/VoitingProgress';
import AccountsGrowth from '../../components/AccountsGrowth';
import { getMarketData } from '../../services/api/blockwatch';
import { getVoitingData, getTxsData, getTxVolume } from '../../services/api/tz-stats';
import { wrapTxs } from '../../utils';
import TransactionVoume from '../../components/TransactionVoume';
import { Spiner } from '../../components/Common'

const Home = () => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      const priceHistory = await getMarketData({ limit: 30 });
      const trasactionVolume = wrapTxs(await getTxsData({ days: 30 }));
      const txData = await getTxVolume();

      setData({
        priceHistory,
        txs: trasactionVolume,
        isLoaded: true,
        txData: { volume: txData[1], txn: txData[2] }
      });
    };

    fetchData();
  }, []);
  return (

    data.isLoaded ?
      (
        <Wrapper>
          <JoinContainer>
            <PriceHistory data={data.priceHistory} />
            <StakingSupply />
          </JoinContainer>
          <JoinContainer>
            <TransactionVoume data={data.txs} txData={data.txData} />
            <CirculatingSupply />
          </JoinContainer>
          <JoinContainer>
            <AccountsGrowth />
            <VoitingProgress />
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


