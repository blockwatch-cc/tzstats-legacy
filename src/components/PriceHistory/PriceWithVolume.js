import React from 'react';
import PriceChart from './PriceChart';
import { Card, FlexColumn, FlexRow, DataBox, FlexRowWrap } from '../Common';
import styled from 'styled-components';
import { CustomVolumeChart } from '../../components/VolumeChart';


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
            <DataBox title="-  14:00" />
          </VolumeScale>
          <VolumeLegend />
        </FlexRowWrap>
      </Card>
    </Wrapper>
  )
};

const CandleStickBody = styled.div`
    width: 20px;
    height: 60px;
    background: #39d7ed; 
`;
const CandleStickRoot = styled.div`
    width: 2px;
    height: 40px;
    background: #39d7ed; 
    margin: 0 9px;
`;
const DataBox2 = styled.div`
  font-size: 10px;
  color:#fff;
`;
const DataBox3 = styled.div`
  font-size: 10px;
  color:rgba(255, 255, 255, 0.52);
`;

const VolumeScale = styled(FlexColumn)`
    justify-content: space-around;
    margin-left: 20px;
`;
const PriceLegend = ({ lastPrice }) => {
  return (<FlexRow ml={15} mr={35} >
    <FlexColumn mr={15} textAlign="right" justifyContent="space-around">
      <DataBox2 style={{ marginRight: "-15px" }}>${lastPrice.high.toFixed(2)}</DataBox2>
      <DataBox2>${lastPrice.open.toFixed(2)}</DataBox2>
      <DataBox2 >${lastPrice.close.toFixed(2)}</DataBox2>
      <DataBox2 style={{ marginRight: "-15px" }}>${lastPrice.low.toFixed(2)}</DataBox2>
    </FlexColumn>
    <FlexColumn justifyContent="center">
      <CandleStickRoot />
      <CandleStickBody />
      <CandleStickRoot />
    </FlexColumn>
    <FlexColumn ml={15} justifyContent="space-around">
      <DataBox3 style={{ marginLeft: "-15px" }}>Highest </DataBox3>
      <DataBox3>Open </DataBox3>
      <DataBox3 >Close </DataBox3>
      <DataBox3 style={{ marginLeft: "-15px" }}>Lowest </DataBox3>
    </FlexColumn>
  </FlexRow>
  )
}

{/* <FlexColumn justifyContent="space-around" minWidth={157} pl={-10} flex={0.25}>
      <FlexRow justifyContent="space-between">
        <DataBox valueType="currency-fixed"
          title="Open price"
          value={123} />
        <DataBox
          valueType="currency-fixed"
          title="Close price"
          value={123} />
      </FlexRow>
      <FlexRow justifyContent=" space-between">
        <DataBox valueType="currency-fixed"
          title="Highest Price"
          value={123} />
        <DataBox valueType="currency-fixed"
          title="Lowest price"
          value={123} />
      </FlexRow>
    </FlexColumn> */}
const VolumeLegend = (params) => {
  return (
    <FlexColumn border="1px solid #787c8b" textAlign="center" justifyContent="space-around" ml={20} minWidth={157} pl={-10} flex={0.25}>
      <DataBox
        valueType="currency-usd-fixed"
        title="Daily Volume"
        value={47677} />
      <FlexColumn>
        <TimeBox>{"08:00 - 12:00"}</TimeBox>
        <DataBox
          valueType="currency-fixed"
          title="Peak of Trade"
        />
      </FlexColumn>
    </FlexColumn>
  )
}
const TimeBox = styled.div`
color: #39d7ed;
`
const Wrapper = styled.div`
      min-width: 340px;
      margin-top:-20px;
    `

export default PriceWithVolume;
