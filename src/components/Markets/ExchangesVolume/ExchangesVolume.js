import React from 'react';
import styled from 'styled-components';
import { Card, EmptyData, Row } from '../../Common';
import ExchangesVolumePie from './ExchangesVolumePie';
import Legend from './Legend';
import _ from 'lodash';
import { graphColors } from '../../../config';
import { isValid } from '../../../utils';
import { marketNames } from '../../../services/api/markets';

const VolumesExchanges = ({ tickers }) => {
  if (!isValid(tickers)) {
    return (
      <Wrapper>
        <EmptyData />
      </Wrapper>
    );
  }
  let byExchange = tickers.reduce((s, t) => {
    s[t.exchange] = (s[t.exchange] || 0) + t.volume_base;
    s._total = (s._total || 0) + t.volume_base;
    return s;
  }, {});
  let settings = getVolumeSettings(byExchange);

  return (
    <Wrapper>
      <Card title={'24h Volume by Exchange'}>
        <Row height={160}>
          <ExchangesVolumePie data={settings} />
          <Legend settings={settings} />
        </Row>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin: 0 5px;
  display: flex;
`;

export default VolumesExchanges;

function getVolumeSettings(data) {
  return Object.keys(data)
    .filter(k => {
      return k[0] !== '_';
    })
    .sort((a, b) => {
      return data[b] - data[a];
    })
    .map((k, i) => {
      return {
        id: marketNames[k] || _.startCase(k),
        color: graphColors[i % graphColors.length],
        percent: Math.round((data[k] / data._total) * 100),
        value: data[k],
      };
    });
}
