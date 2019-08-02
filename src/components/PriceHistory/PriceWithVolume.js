import React from 'react';
import PriceChart from './PriceChart';
import { Card, FlexColumn, FlexRow, DataBox, FlexRowWrap } from '../Common';
import styled from 'styled-components';
import { CustomVolumeChart } from '../../components/VolumeChart';
import { getPeakVolumeTime, getDailyVolume } from '../../utils';

//TODO REFACTORING
const PriceWithVolume = ({ priceHistory, volumeHistory }) => {
  let lastPrice = priceHistory.slice(-1).pop();

  return (
    <Wrapper>
      <Card title={'Price History in US Dollars (30d)'}>
        <FlexRowWrap >
          <div style={{ flex: 1.1, marginBottom: "20px", marginRight: "20px", height: 145, width: 270 }} >
            <PriceChart type={'svg'} data={priceHistory} />
          </div>
          <PriceLegend lastPrice={lastPrice} />
        </FlexRowWrap>
        <FlexRowWrap>
          <CustomVolumeChart data={volumeHistory} />
          <VolumeScale>
            <DataBox title="-  04:00" />
            <DataBox title="-  12:00" />
            <DataBox title="-  20:00" />
          </VolumeScale>
          <VolumeLegend peak={getPeakVolumeTime(volumeHistory, 4)} dailyVolume={getDailyVolume(priceHistory)} />
        </FlexRowWrap>
      </Card>
    </Wrapper>
  )
};

const PriceLegend = ({ lastPrice }) => {
  return (
    <FlexColumn mx={45} textAlign="center" justifyContent="space-around">
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Highest Price" value={lastPrice.high} />
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Close Price" value={lastPrice.close} />
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Open Price" value={lastPrice.open} />
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Low Price" value={lastPrice.low} />
    </FlexColumn>
  )
}

const VolumeLegend = ({ peak, dailyVolume }) => {
  return (
    <FlexColumn border="1px solid #787c8b" textAlign="center" justifyContent="space-around" ml={20} minWidth={157} pl={-10} flex={0.25}>
      <DataBox
        valueType="currency-short"
        title="Average Daily Volume"
        value={dailyVolume} />
      <FlexColumn>
        <TimeBox>{peak}</TimeBox>
        <DataBox
          valueType="currency-fixed"
          title="Peak Trading Hours"
        />
      </FlexColumn>
    </FlexColumn>
  )
}
const TimeBox = styled.div`
    color: #39d7ed;
`;
const Wrapper = styled.div`
    min-width: 340px;
    margin-top:-20px;
`;

const VolumeScale = styled(FlexColumn)`
    justify-content: space-around;
    margin-left: 20px;
`;
export default PriceWithVolume;
