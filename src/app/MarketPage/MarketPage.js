import React from 'react';
import styled from 'styled-components';
import { PriceWithVolume } from '../../components/Markets/PriceHistory';
import TradeCurrency from '../../components/Markets/TradeCurrency';
import ExchangesVolume from '../../components/Markets/ExchangesVolume';
import { getMarketTickers, getOhlcvData, getSeriesData } from '../../services/api/markets';
import { Spiner } from '../../components/Common';
import { wrapToVolume } from '../../utils';

const MarketPage = props => {
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
      let volume = wrapToVolume(volSeries);
      let byCurrency = tickers.reduce((s, t) => {
        s[t.quote] = (s[t.quote] || 0) + t.volume_base;
        s._total = (s._total || 0) + t.volume_base;
        return s;
      }, {});
      let byExchange = tickers.reduce((s, t) => {
        s[t.exchange] = (s[t.exchange] || 0) + t.volume_base;
        s._total = (s._total || 0) + t.volume_base;
        return s;
      }, {});

      setData({
        isLoaded: true,
        priceHistory: marketData,
        volume,
        byExchange,
        byCurrency,
      });
    };

    fetchData();
  }, []);
  return data.isLoaded ? (
    <Wrapper>
      <PriceWithVolume priceHistory={data.priceHistory} volumeHistory={data.volume} />
      <JoinContainer>
        <TradeCurrency data={data.byCurrency} />
        <ExchangesVolume data={data.byExchange} />
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
