import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Card, DataBox, FlexColumnWrap, FlexColumn } from '../../Common';
import { VerticalProgressBar } from '../../Common/ProgressBar';
import { graphColors } from '../../../config';
import { formatCurrency } from '../../../utils';

const TradeCurrency = ({ tickers }) => {
  let byCurrency = tickers.reduce((s, t) => {
    s[t.quote] = (s[t.quote] || 0) + t.volume_base;
    s._sum = (s._sum || 0) + t.volume_base;
    return s;
  }, {});
  byCurrency._max = _.max(
    _.keys(byCurrency)
      .filter(k => k[0] !== '_')
      .map(k => byCurrency[k])
  );
  let settings = getTradeCurrencySettings(byCurrency);

  return (
    <Wrapper>
      <Card title={'24h Volume by Currency'}>
        <FlexColumnWrap>
          <VerticalProgressBar settings={settings} />
          <Legend data={settings} />
        </FlexColumnWrap>
      </Card>
    </Wrapper>
  );
};

const Legend = ({ data }) => {
  return (
    <LegendWrapper>
      {data.map((item, i) => {
        return (
          <FlexColumn key={i}>
            <div style={{ fontSize: 14 }}>{item.id}</div>
            <DataBox titleSize="12px" title={formatCurrency(item.value, '.3s')+'tz'} />
          </FlexColumn>
        );
      })}
    </LegendWrapper>
  );
};

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
  display: flex;
`;

export default TradeCurrency;

function getTradeCurrencySettings(data) {
  return Object.keys(data)
    .filter(k => {
      return k[0] !== '_';
    })
    .sort((a, b) => {
      return data[b] - data[a];
    })
    .map((k, i) => {
      return {
        id: k,
        color: graphColors[i % graphColors.length],
        size: ((data[k] / data._max) * 100).toFixed(),
        percent: ((data[k] / data._sum) * 100).toFixed(),
        value: data[k].toFixed(),
      };
    });
}
