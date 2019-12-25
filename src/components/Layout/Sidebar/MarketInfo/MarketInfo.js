import React from 'react';
import styled from 'styled-components';
import { getMarketTickers } from '../../../../services/api/markets';
import { useGlobal, setGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { Link, withRouter } from 'react-router-dom';
import { DataBox, Row, Column, RowSpace, LinkIcon } from '../../../Common';

const MarketInfo = ({ history }) => {
  const [chain] = useGlobal('chain');
  const [lastMarketData] = useGlobal('lastMarketData');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let tickers = await getMarketTickers();
        let now = new Date();
        // filter fresh tickers in USD only (age < 2min)
        let usdtickers = tickers.filter(e => e.quote === 'USD' && now - e.timestamp < 2 * 60000);
        // price index: use all USD ticker last prices with equal weight
        let vol = usdtickers.reduce((s, t) => s + t.volume_base, 0) || 1;
        setGlobal({
          tickers: tickers,
          lastMarketData: {
            date: usdtickers.length?usdtickers[0].timestamp:new Date(),
            price:
              usdtickers.reduce((s, t) => {
                return s + t.last * t.volume_base / vol;
              }, 0) || 0,
            change:
              usdtickers.reduce((s, t) => {
                return s + t.change * t.volume_base / vol;
              }, 0) || 0,
          },
        });
      } catch(e) {}
    };
    chain.height && fetchData();
  }, [chain]);

  const calculateMarketCap = () => {
    return lastMarketData.price * chain.supply.circulating;
  };

  const getPriceIndicator = () => {
    return lastMarketData.change < 0 ? <span>&#9662;</span> : <span>&#9652;</span>;
  };

  return (
    <Wrapper>
      <Link to={"/market"}>
      <LinkIcon>&#x25E5;</LinkIcon>
      <Card interactive={true} elevation={Elevation.ZERO}>
        <RowSpace>
          <Column>
            <Row>
              <div style={{ fontSize: 16 }}>${lastMarketData.price.toFixed(2)}</div>
              <PriceChanges style={{color:(lastMarketData.change < 0 ?'#FC6483':'#1af9ff')}}>
                {getPriceIndicator()}
                &nbsp;
                {Math.abs(lastMarketData.change).toFixed(1)}%
              </PriceChanges>
            </Row>
            <DataBox title="Tezos Price" />
          </Column>
          <DataBox
            valueSize="16px"
            title="Market Cap"
            valueOpts={{dim:0,digits:3,round:1}}
            valueType="currency-usd"
            value={calculateMarketCap()}
          />
        </RowSpace>
      </Card>
      </Link>
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
