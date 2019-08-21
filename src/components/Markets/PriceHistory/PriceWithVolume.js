import React from 'react';
import PriceChart from './PriceChart';
import { Card, FlexColumn, DataBox, InvalidData, FlexRowWrap, FlexRowSpaceBetween } from '../../Common';
import styled from 'styled-components';
import VolumeChart from '../VolumeChart';
import _ from 'lodash';
import { timeFormat } from 'd3-time-format';
import { isValid, getPeakVolumeTime, getDailyVolume, wrapToVolume } from '../../../utils';

//TODO REFACTORING
const PriceWithVolume = ({ marketData, volSeries }) => {
  const [currentValue, setCurrentValue] = React.useState({
    data: { time: new Date() },
    period: '',
    volume: volSeries[volSeries.length - 1][1],
  });
  if (!isValid(marketData, volSeries)) {
    return <InvalidData />;
  }

  let max = _.maxBy(volSeries, item => item[1])[1];
  let volume = wrapToVolume(volSeries);
  let priceHistory = marketData.map((item, i) => {
    item['hourVolumes'] = volume[i];
    return item;
  });
  let lastPrice = priceHistory.slice(-1).pop();

  return (
    <Wrapper>
      <Card title={'Price History in US Dollars (30d)'}>
        <FlexRowWrap height={350}>
          <div style={{ flex: 1.1, marginLeft: 10, marginRight: 20 }}>
            <PriceChart type={'svg'} data={priceHistory} volumeMax={max} setCurrentValue={setCurrentValue} />
          </div>
          <FlexColumn justifyContent="space-between" width={160} borderTop="1px solid #787c8b">
            <PriceLegend lastPrice={lastPrice} />
            <DataBox
              valueSize="14px"
              valueType="currency-short"
              title="Average Daily Volume"
              value={getDailyVolume(priceHistory)}
            />
            <VolumeLegend peak={getPeakVolumeTime(volSeries, 4)} currentValue={currentValue} />
          </FlexColumn>
        </FlexRowWrap>
      </Card>
    </Wrapper>
  );
};

const PriceLegend = ({ lastPrice }) => {
  return (
    <FlexColumn height={170} borderBottom="1px solid #787c8b" justifyContent="space-evenly">
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Open Price" value={lastPrice.open} />
      <div style={{ marginRight: 10 }}>
        <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Last Price" value={lastPrice.close} />
      </div>
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Lowest Price" value={lastPrice.low} />
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Highest Price" value={lastPrice.high} />
    </FlexColumn>
  );
};

const VolumeLegend = ({ peak, currentValue }) => {
  return (
    <FlexColumn
      height={130}
      borderTop="1px solid #787c8b"
      borderBottom="1px solid #787c8b"
      justifyContent="space-evenly"
    >
      <DataBox valueSize="14px" value={peak} valueType="text" title="Peak Trading Hours" />
      <DataBox
        valueSize="14px"
        valueType="currency-short"
        title={`${timeFormat('%b %d, %Y')(new Date(currentValue.data.time))} ${currentValue.period} UTC`}
        value={currentValue.volume}
      />
      <FlexColumn />
    </FlexColumn>
  );
};
const Wrapper = styled.div`
  min-width: 340px;
`;

export default PriceWithVolume;
