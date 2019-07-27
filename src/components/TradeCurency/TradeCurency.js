import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexColumnWrap } from '../Common';
import TradeCurencyBar from './TradeCurencyBar';
import { VerticalProgressBar } from '../ProgressBar';
import { useGlobal } from 'reactn';
import { format } from 'd3-format';

const TradeCurency = ({ data }) => {


  let settings = getTradeCurrencySettings(data);

  return (
    <Wrapper>

      <Card title={'Trades by Currency'}>
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
      {
        data.map(function (item) {
          return (
            <DataBox
              type="value-as-title"
              title={item.id}
              valueSize="12px"
              valueType="currency-short"
              value={item.value} />
          )
        })
      }
    </LegendWrapper>
  )
}

const LegendWrapper = styled.div`
      display:flex;
      flex-direction:row;
      margin-top:10px;
      justify-content: space-between;
    `;


const Wrapper = styled.div`
      flex: 1;
      min-width: 340px;
      margin: 0 5px;
    `;

export default TradeCurency;

function getTradeCurrencySettings(data) {
  let total = data.USD.volume_base + data.EUR.volume_base + data.BTC.volume_base + data.EUR.volume_base;
  return [
    {
      id: "USD",
      color: "#18ecf2",
      percent: ((data.USD.volume_base / total) * 100).toFixed(),
      value: data.USD.volume_base.toFixed()
    },
    {
      id: "EUR",
      color: "#29bcfa",
      percent: ((data.EUR.volume_base / total) * 100).toFixed(),
      value: data.EUR.volume_base.toFixed()
    },
    {
      id: "BTC",
      color: "#3e85f1",
      percent: ((data.BTC.volume_base / total) * 100).toFixed(),
      value: data.BTC.volume_base.toFixed()
    },
    {
      id: "ETH",
      color: "#858999",
      percent: ((data.ETH.volume_base / total) * 100).toFixed(),
      value: data.ETH.volume_base.toFixed()
    },
  ]
}

