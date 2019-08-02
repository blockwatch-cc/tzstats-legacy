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
