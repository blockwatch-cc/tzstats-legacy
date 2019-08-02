import React from 'react';
import styled from 'styled-components';
import { getMarketTickers } from '../../services/api/markets';
import { useGlobal, setGlobal } from 'reactn';
import { format } from 'd3-format';
import { Card, Elevation } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';
import { DataBox } from '../Common'

const MarketInfo = ({ history }) => {
  const [chain] = useGlobal('chain');

  const [lastMarketData] = useGlobal('lastMarketData');

  React.useEffect(() => {
    const fetchData = async () => {
      let tickers = await getMarketTickers();
      let now = new Date();
      // filter fresh tickers in USD only (age < 2min)
      tickers = tickers.filter( e => e.quote === 'USD' && (now-e.timestamp)<2*60000);
      // price index: use all USD ticker last prices with equal weight
      setGlobal({ lastMarketData: {
        date: tickers[0].timestamp,
        price: tickers.reduce((s, t) => { return s + t.last / tickers.length;}, 0) || 0,
        change: tickers.reduce((s, t) => { return s + t.change / tickers.length; }, 0) || 0
      } });
    };
    chain.height && fetchData();
  }, [chain]);

  const calculateMarketCap = () => {
    return (lastMarketData.price * (chain.supply.activated + chain.supply.mined + chain.supply.vested - chain.supply.burned));
  };
  const getLastChange = () => {
    return lastMarketData.change.toFixed(1);
  };
  const handleClick = () => {
    history.push('/market');
  };
  const getPriceIndicator = () => {
    return getLastChange() < 0 ? <span>&#9662;</span> : <span>&#9652;</span>
  }

  return (
    <Card onClick={handleClick} interactive={true} elevation={Elevation.ZERO}>
      <DataBox title="Tezos Price" />
      <PriceWrapper>
        {format('$,')(lastMarketData.price.toFixed(2))} <PriceChanges>{getPriceIndicator()}{Math.abs(getLastChange()) || 0} %</PriceChanges>
      </PriceWrapper>
      <DataBox
        type='title-bottom'
        title="Market Cap"
        valueType="currency-usd-short"
        value={calculateMarketCap()} />
    </Card>
  );
};

const PriceWrapper = styled.div`
    margin-bottom: 20px;
  `;
const PriceChanges = styled.span`
    color: #1af9ff;
    font-size: 14px;
    margin-left: 5px;
  `;
export default withRouter(MarketInfo);
