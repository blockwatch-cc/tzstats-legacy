import React from 'react';
import styled from 'styled-components';
import { PriceWithVolume } from '../../components/Markets/PriceHistory';
import TradeCurrency from '../../components/Markets/TradeCurrency';
import ExchangesVolume from '../../components/Markets/ExchangesVolume';
import { getMarketTickers, getOhlcvData, getSeriesData } from '../../services/api/markets';
import { Spiner } from '../../components/Common';

const MarketPage = () => {
  const [data, setData] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let [marketData, volSeries, tickers] = await Promise.all([
        getOhlcvData({ days: 30 }),
        getSeriesData({
          dataset: 'kraken/XTZ_USD/ohlcv',
          days: 30,
          collapse: '4h',
          limit: 180,
          columns: ['time', 'vol_base'],
        }),
        getMarketTickers(),
      ]);

      setData({
        isLoaded: true,
        marketData,
        volSeries,
        tickers,
      });
    };

    fetchData();
  }, []);
  return data.isLoaded ? (
    <Wrapper>
      <PriceWithVolume marketData={data.marketData} volSeries={data.volSeries} />
      <JoinContainer>
        <TradeCurrency tickers={data.tickers} />
        <ExchangesVolume tickers={data.tickers} />
      </JoinContainer>
    </Wrapper>
  ) : (
    <Spiner />
  );
};
const Wrapper = styled.div``;
const JoinContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -5px;
`;

export default MarketPage;
