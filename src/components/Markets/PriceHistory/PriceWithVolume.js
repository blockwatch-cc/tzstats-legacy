import React from 'react';
import PriceChart from './PriceChart';
import { Card, FlexColumn, DataBox, EmptyData, FlexRowWrap } from '../../Common';
import styled from 'styled-components';
import _ from 'lodash';
import { isValid, getPeakVolumeTime, getDailyVolume, wrapToVolume } from '../../../utils';

//TODO REFACTORING
const PriceWithVolume = ({ marketData, volSeries }) => {
  const [currentValue, setCurrentValue] = React.useState({
    data: { time: new Date() },
    period: '',
    volume: volSeries[volSeries.length - 1][1],
  });
  if (!isValid(marketData, volSeries)) {
    return (
      <Wrapper>
        <EmptyData />
      </Wrapper>
    );
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
              valueType="currency"
              valueOpts={{digits:3}}
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
      <DataBox valueSize="14px" valueType="currency-usd" valueOpts={{dim:0,prec:2,digits:0}} title="Last Price" value={lastPrice.close} />
      <DataBox valueSize="14px" valueType="currency-usd" valueOpts={{dim:0,prec:2,digits:0}} title="Open Price Today" value={lastPrice.open} />
      <DataBox valueSize="14px" valueType="currency-usd" valueOpts={{dim:0,prec:2,digits:0}} title="Highest Price Today" value={lastPrice.high} />
      <DataBox valueSize="14px" valueType="currency-usd" valueOpts={{dim:0,prec:2,digits:0}} title="Lowest Price Today" value={lastPrice.low} />
    </FlexColumn>
  );
};

const VolumeLegend = ({ peak, currentValue }) => {
  return (
    <FlexColumn
      height={130}
      borderTop="1px solid #787c8b"
      borderBottom="1px solid #787c8b"
      justifyContent="space-around"
    >
      <DataBox valueSize="14px" value={peak} valueType="text" title="Peak Trading Hours" />
    </FlexColumn>
  );
};
const Wrapper = styled.div`
  min-width: 340px;
`;

export default PriceWithVolume;


// <DataBox
//   valueSize="14px"
//   valueType="currency"
//   title={`${timeFormat('%b %d, %Y')(new Date(currentValue.data.time))} ${currentValue.period} UTC`}
//   value={currentValue.volume}
// />
