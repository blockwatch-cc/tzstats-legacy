import React from 'react';
import styled from 'styled-components';
import { PriceWithVolume } from '../../components/PriceHistory';
import TzSpinner from '../../components/TzSpinner'
import TradeCurency from '../../components/TradeCurency'
import ExchangesVolume from '../../components/ExchangesVolume'
import { getExchangeTikers, getTradesByCurrencies } from '../../services/api/tz-stats';
import { getMarketData } from '../../services/api/blockwatch';
import { Spiner } from '../../components/Common'
import { wrapToVolume } from '../../utils';


const MarketPage = props => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {

      let [marketData, volumeData, tikers, trades] = await Promise.all([
        getMarketData({ days: 29 }),
        getMarketData({ days: 30, collapse: '4h', limit: 180 }),
        getExchangeTikers({ pair: "XTZ_USD" }),
        getTradesByCurrencies({ exchange: "kraken" })

      ]);
      let volume = wrapToVolume(volumeData)

      setData({
        isLoaded: true,
        priceHistory: marketData,
        volume,
        tikers,
        trades
      });
    };

    fetchData();
  }, []);
  return (
    data.isLoaded ?
      (
        <Wrapper>
          <PriceWithVolume
            priceHistory={data.priceHistory}
            volumeHistory={data.volume}
          />
          <JoinContainer>
            <TradeCurency data={data.trades} />
            <ExchangesVolume data={data.tikers} />
          </JoinContainer>
        </Wrapper>
      ) :
      <Spiner />
  )
};
const Wrapper = styled.div`

`;
const JoinContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -5px;
`;

export default MarketPage;
