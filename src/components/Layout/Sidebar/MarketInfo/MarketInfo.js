import React from 'react';
import styled from 'styled-components';
import { getMarketTickers } from '../../../../services/api/markets';
import { useGlobal, setGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';
import { DataBox, FlexRow, FlexRowSpaceBetween, FlexColumn, LinkIcon } from '../../../Common';

const MarketInfo = ({ history }) => {
  const [chain] = useGlobal('chain');

  const [lastMarketData] = useGlobal('lastMarketData');

  React.useEffect(() => {
    const fetchData = async () => {
      let tickers = await getMarketTickers();
      let now = new Date();
      // filter fresh tickers in USD only (age < 2min)
      tickers = tickers.filter(e => e.quote === 'USD' && now - e.timestamp < 2 * 60000);
      // price index: use all USD ticker last prices with equal weight
      setGlobal({
        lastMarketData: {
          date: tickers[0].timestamp,
          price:
            tickers.reduce((s, t) => {
              return s + t.last / tickers.length;
            }, 0) || 0,
          change:
            tickers.reduce((s, t) => {
              return s + t.change / tickers.length;
            }, 0) || 0,
        },
      });
    };
    chain.height && fetchData();
  }, [chain]);

  const calculateMarketCap = () => {
    return (
      lastMarketData.price * (chain.supply.activated + chain.supply.mined + chain.supply.vested - chain.supply.burned)
    );
  };

  const handleClick = () => {
    history.push('/market');
  };
  const getPriceIndicator = () => {
    return lastMarketData.change < 0 ? <span>&#9662;</span> : <span>&#9652;</span>;
  };

  return (
    <Wrapper>
      <LinkIcon>&#x25E5;</LinkIcon>
      <Card onClick={handleClick} interactive={true} elevation={Elevation.ZERO}>
        <FlexRowSpaceBetween>
          <FlexColumn>
            <DataBox title="Tezos Price" />
            <FlexRow>
              <div style={{ fontSize: 16 }}>${lastMarketData.price.toFixed(2)}</div>
              <PriceChanges>
                {getPriceIndicator()}
                &nbsp;
                {Math.abs(lastMarketData.change).toFixed(1)}%
              </PriceChanges>
            </FlexRow>
          </FlexColumn>
          {/* <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.52)' }}>
            <div>|</div>
            <div>|</div>
          </div> */}
          <DataBox
            valueSize="16px"
            type="title-bottom"
            title="Market Cap"
            valueType="currency-usd-short"
            value={calculateMarketCap()}
          />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const PriceChanges = styled.span`
  color: #1af9ff;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
`;
const Wrapper = styled.div`
  margin-top: 10px;
  position: relative;
`;
export default withRouter(MarketInfo);
