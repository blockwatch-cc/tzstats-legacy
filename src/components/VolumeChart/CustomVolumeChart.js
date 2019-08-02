import React from "react";
import ReactDOM from "react-dom";
import { DataBox, FlexRow, FlexColumnWrap } from '../Common'
import { ResponsiveWaffleHtml } from "@nivo/waffle";
import styled from 'styled-components';
import Popover from '../Popover';
import { formatCurrency } from '../../utils'
import { timeFormat } from 'd3-time-format';

const CustomVolumeChart = ({ data }) => {

  const getOpacity = (percent) => {
    return percent < 25 ? 0.1 : percent < 50 ? 0.3 : percent < 75 ? 0.6 : 0.9
  }

  return (
    <Wrapper>
      {data.map((item, i) => {
        return (
          <Popover placement="top" content={
            <DataBox
              valueType="currency-fixed"
              value={item.value}
              title={timeFormat('%B %d, %Y')(new Date(item.time))}
            />} >
            <Block key={i} opacity={getOpacity(item.percent)}>

            </Block>
          </Popover>
        )
      })}

    </Wrapper>
  )

}

const ChartTooltip = () => {
  return (
    <TooltipWrapper>
      <Time>Tue, 22 Apr 12:00-16:00</Time>
      <Separator />
      <Value>
        Volume : 123,144 ꜩ
        </Value>
    </TooltipWrapper>
  );
};
const Time = styled.div`
    color: rgba(255,255,255,0.52);
    fonst-size: 13;
`
const Value = styled.div`
    color: point.serieColor;
    padding: '3px 0';
    fontSize: '16px';
    fontWeight: 'lighter';
    textAlign: 'left';
`
const TooltipWrapper = styled.div`
    background: '#30313b';
    width: '300px';
    padding: '20px 20px';
    text-align: 'center';
    opacity: 0.8;
`;
const Separator = styled.div`
    height: '2px';
    margin: '5px 0px';
    background: '#424552';
    width: '100%';
`


const Wrapper = styled(FlexColumnWrap)`
  /* ... */
  min-width:340px;
  max-width:600px;
  max-height:120px
`;
const Block = styled.div`
  min-width: 20px;
  min-height: 20px;
  background: #38E8FF;
  border: 2px solid #424551;
  opacity: ${prop => prop.opacity}
`;


export default CustomVolumeChart;
