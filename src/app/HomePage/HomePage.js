import React from 'react';
import styled from 'styled-components';
import { PriceHistory } from '../../components/PriceHistory/';
import { StakingSupply, CirculatingSupply } from '../../components/SupplyBreakdown';
import ElectionProgress from '../../components/ElectionProgress';
import AccountsGrowth from '../../components/AccountsGrowth';
import { getMarketData } from '../../services/api/blockwatch';
import { getElectionData, getTxsData, getLastBlockTxData } from '../../services/api/tz-stats';
import { wrapTxs } from '../../utils';
import TransactionVoume from '../../components/TransactionVoume';
import { Spiner } from '../../components/Common'

const Home = () => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {

      let [priceHistory, txDataLast, txData, election] = await Promise.all([
        getMarketData({ days: 30 }),
        getLastBlockTxData(),
        getTxsData({ days: 30 }),
        getElectionData()
      ]);
      const trasactionVolume = wrapTxs(txData);

      setData({
        priceHistory,
        txs: trasactionVolume,
        isLoaded: true,
        election,
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


