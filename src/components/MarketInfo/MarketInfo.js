import React from 'react';
import styled from 'styled-components';
import { getLastTezosPrice } from '../../services/api/tz-stats';
import { useGlobal, setGlobal } from 'reactn';
import { format } from 'd3-format';
import { Card, Elevation } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';
import { DataBox } from '../Common'

const MarketInfo = ({ history }) => {
  const [chain] = useGlobal('chain');

  const [lastMarketData] = useGlobal('lastMarketData');
  console.log(lastMarketData, 'la')

  React.useEffect(() => {
    const fetchData = async () => {
      let lastMarketData = await getLastTezosPrice();
      setGlobal({ lastMarketData: lastMarketData });
    };
    chain.height && fetchData();
  }, [chain]);

  const calculateMarketCup = () => {
    return (lastMarketData.last * (chain.supply.activated + chain.supply.mined + chain.supply.vested - chain.supply.burned));
  };

  const handleClick = () => {
    history.push('/market');
  };
  const getPriceIndecator = () => {
    return lastMarketData.change < 0 ? <span>&#9662;</span> : <span>&#9652;</span>
  }

  return (
    <Card onClick={handleClick} interactive={true} elevation={Elevation.ZERO}>
      <DataBox title="Tezos Price" />
      <PriceWrapper>
        {format('$,')(lastMarketData.last.toFixed(2))} <PriceChanges>{getPriceIndecator()}{Math.abs(lastMarketData.change).toFixed()} %</PriceChanges>
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
