import React from 'react';
import styled from 'styled-components';
import { getMarketData } from '../../services/api/blockwatch';
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
      let lastMarketData = await getMarketData({ days: 1 });
      setGlobal({ lastMarketData: lastMarketData[0] });
    };
    chain.height && fetchData();
  }, [chain]);

  const calculateMarketCup = () => {
    return (lastMarketData.close * (chain.supply.activated + chain.supply.mined + chain.supply.vested - chain.supply.burned));
  };
  const getLastChanges = () => {
    return ((lastMarketData.open - lastMarketData.close) / lastMarketData.open * 100).toFixed(1);
  };
  const handleClick = () => {
    history.push('/market');
  };
  const getPriceIndecator = () => {
    return getLastChanges() < 0 ? <span>&#9662;</span> : <span>&#9652;</span>
  }

  return (
    <Card onClick={handleClick} interactive={true} elevation={Elevation.ZERO}>
      <DataBox title="Tezos price" />
      <PriceWrapper>
        {format('$,')(lastMarketData.close.toFixed(2))} <PriceChanges>{getPriceIndecator()}{Math.abs(getLastChanges()) || 0} %</PriceChanges>
      </PriceWrapper>
      <DataBox
        type='title-bottom'
        title="Market Cap"
        valueType="currency-usd-short"
        value={calculateMarketCup()} />
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
