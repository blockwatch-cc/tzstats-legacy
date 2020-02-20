import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import { PriceWithVolume } from '../components/Markets/PriceHistory';
import TradeCurrency from '../components/Markets/TradeCurrency';
import ExchangesVolume from '../components/Markets/ExchangesVolume';
import PriceList from '../components/Markets/PriceList';
import { Spinner } from '../components/Common';
import { useMetaTags } from '../hooks/useMetaTags';

const MarketPage = () => {
  const [tickers] = useGlobal('tickers');
  useMetaTags('Tezos Markets');

  return tickers.length ? (
    <Wrapper>
      <PriceList />
      <PriceWithVolume />
      <JoinContainer>
        <TradeCurrency tickers={tickers} />
        <ExchangesVolume tickers={tickers} />
      </JoinContainer>
    </Wrapper>
  ) : (
    <Spinner />
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
