import React from 'react';
import styled from 'styled-components';
import { Card, RowSpace, Column, Value } from '../../Common';
import { useGlobal } from 'reactn';
import _ from 'lodash';

const PriceList = () => {
  const [tickers] = useGlobal('tickers');
  return (
    <Wrapper>
      <Card>
      <RowSpace>
      {vwapPrices(tickers).map((t,i) => (
        <Column key={i}>
           <div style={{fontSize: 12, marginRight:5}}>{t.quote}</div>
          <Value
            fontSize="14px"
            type="currency-full"
            sym=""
            value={t.vwap}
            dim={true}
            digits={4}
          />
         <div>
           <span style={{fontSize: 12, color:(t.change < 0 ?'#FC6483':'#1af9ff')}}>
              {getPriceIndicator(t)}&nbsp;{Math.abs(t.change).toFixed(1)}%
            </span>
          </div>
        </Column>
       ))}
      </RowSpace>
      </Card>
    </Wrapper>
  );
};

const vwapPrices = (tickers) => {
  return  _(tickers)
    .groupBy('quote')
    .map(function(items, quote) {
      return {
        quote: quote,
        vwap: _.meanBy(items, (t) => t.last),
        change: _.meanBy(items, (t) => t.change)
      };
    }).value();
};

const getPriceIndicator = (t) => {
  return t.change < 0 ? <span>&#9662;</span> : <span>&#9652;</span>;
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0;
`;

export default PriceList;
