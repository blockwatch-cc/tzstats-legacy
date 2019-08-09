import React from 'react';
import PriceChart from './PriceChart';
import { Card, FlexColumn, FlexRow, DataBox, FlexRowWrap, FlexColumnWrap } from '../Common';
import styled from 'styled-components';
import { CustomVolumeChart } from '../../components/VolumeChart';
import { getPeakVolumeTime, getDailyVolume } from '../../utils';

//TODO REFACTORING
const PriceWithVolume = ({ priceHistory, volumeHistory }) => {
  let lastPrice = priceHistory.slice(-1).pop();

  return (
    <Wrapper>
      <Card title={'Price History in US Dollars (30d)'}>
        <FlexRow justifyContent="space-between">
          <FlexColumn>
            <FlexRow>
              <div style={{ marginBottom: "20px", marginRight: "20px", width: 640 }} >
                <PriceChart type={'svg'} data={priceHistory} />
              </div>
            </FlexRow>
            <FlexRow>
              <CustomVolumeChart data={volumeHistory} />
              <VolumeScale>
                <DataBox title="-  04:00" />
                <DataBox title="-  12:00" />
                <DataBox title="-  20:00" />
              </VolumeScale>
            </FlexRow>
          </FlexColumn>
          <PriceLegend lastPrice={lastPrice} dailyVolume={getDailyVolume(priceHistory)} peak={getPeakVolumeTime(volumeHistory, 4)}/>
         </FlexRow>
      </Card>
    </Wrapper>
  )
};

const PriceLegend = ({ lastPrice, dailyVolume, peak }) => {
  return (
    <FlexColumn width={100} textAlign="center" justifyContent="space-between">
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Open Price" value={lastPrice.open} />
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Close Price" value={lastPrice.close} />
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Highest Price" value={lastPrice.high} />
      <DataBox valueSize="14px" valueType="currency-usd-fixed" title="Lowest Price" value={lastPrice.low} />
      <DataBox valueSize="14px" valueType="currency-short" title="Daily Volume" value={dailyVolume} />
      <DataBox valueSize="14px" valueType="text" title="Peak Hours" value={peak} />
    </FlexColumn>
  )
}

const Wrapper = styled.div`
        min-width: 340px;
    `;

const VolumeScale = styled(FlexColumn)`
        justify-content: space-around;
        margin-left: 5px;
        white-space: nowrap;
    `;
export default PriceWithVolume;
