import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexColumnWrap } from '../../Common';
import { VerticalProgressBar } from '../../Common/ProgressBar';
import { graphColors } from '../../../config';

const TradeCurrency = ({ data }) => {
  let settings = getTradeCurrencySettings(data);

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
      {data.map(function(item) {
        return (
          <DataBox
            type="value-as-title"
            title={item.id}
            valueSize="12px"
            valueType="currency-short"
            value={item.value}
          />
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
  min-width: 340px;
  margin: 0 5px;
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
        percent: ((data[k] / data._total) * 100).toFixed(),
        value: data[k].toFixed(),
      };
    });
}
