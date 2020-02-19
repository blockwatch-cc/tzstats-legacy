import React from 'react';
import styled from 'styled-components';
import { timeFormat } from 'd3-time-format';

const ChartTooltip = ({ slice }) => {
  return (
    <Wrapper>
      <Time>{timeFormat('%B %d, %Y')(new Date(slice.points[0].data.x))}</Time>
      <Separator />
      {slice.points.map(point => (
        <Value key={point.id}>
          {point.serieId} : {point.data.yFormatted.toFixed()} XTZ
        </Value>
      ))}
    </Wrapper>
  );
};
const Time = styled.div`
  color: rgba(255, 255, 255, 0.52);
  fonst-size: 13;
`;
const Value = styled.div`
  color: point.serieColor;
  padding: '3px 0';
  fontsize: '16px';
  fontweight: 'lighter';
  textalign: 'left';
`;
const Wrapper = styled.div`
  background: '#30313b';
  width: '300px';
  padding: '20px 20px';
  text-align: 'center';
  opacity: 1;
`;
const Separator = styled.div`
  height: '2px';
  margin: '5px 0px';
  background: '#424552';
  width: '100%';
`;

export default ChartTooltip;
