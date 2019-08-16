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
        <FlexRowWrap height={360}>
          <div style={{ flex: 1.1, marginLeft: 10 }}>
            <PriceChart type={'svg'} data={priceHistory} volumeMax={max} setCurrentValue={setCurrentValue} />
          </div>
          <FlexColumn justifyContent="space-between">
            <PriceLegend lastPrice={lastPrice} />
            <DataBox valueType="currency-short" title="Average Daily Volume" value={getDailyVolume(priceHistory)} />
            <VolumeLegend peak={getPeakVolumeTime(volSeries, 4)} currentValue={currentValue} />
          </FlexColumn>
        </FlexRowWrap>
      </Card>
    </Wrapper>
  );
};

const PriceLegend = ({ lastPrice }) => {
  return (
    <FlexColumn width={180} height={100} justifyContent="space-around">
      <FlexRowSpaceBetween>
        <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Open Price" value={lastPrice.open} />
        <div style={{ marginRight: 10 }}>
          <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Close Price" value={lastPrice.close} />
        </div>
      </FlexRowSpaceBetween>
      <FlexRowSpaceBetween>
        <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Lowest Price" value={lastPrice.low} />
        <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Highest Price" value={lastPrice.high} />
      </FlexRowSpaceBetween>
    </FlexColumn>
  );
};

const VolumeLegend = ({ peak, currentValue }) => {
  return (
    <FlexColumn mt={20} height={120} border="1px solid #787c8b" textAlign="center" justifyContent="space-around">
      <DataBox
        ta="center"
        valueType="currency-short"
        title={`${timeFormat('%B %d, %Y')(new Date(currentValue.data.time))} ${currentValue.period}`}
        value={currentValue.volume}
      />
      <FlexColumn>
        <TimeBox>{peak}</TimeBox>
        <DataBox ta="center" valueType="currency-fixed" title="Peak Trading Hours" />
      </FlexColumn>
    </FlexColumn>
  );
};
const TimeBox = styled.div`
  color: #39d7ed;
`;
const Wrapper = styled.div`
  min-width: 340px;
`;

export default PriceWithVolume;
