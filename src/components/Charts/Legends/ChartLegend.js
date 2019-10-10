import React from 'react';
import styled from 'styled-components';
import { DataBox } from '..';

const ChartLegend = ({ settings }) => {
  return (
    <LegendWrapper>
      <LegendContent settings={settings} />
    </LegendWrapper>
  );
};

const LegendContent = ({ settings }) => {
  return settings.map((item, i) => {
    return (
      <LegendItem key={i} color={item.color}>
        <DataBox title={item.title} />
      </LegendItem>
    );
  });
};

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  margin-top: 25px;
`;

const LegendItem = styled.div`
  margin-left: 20px;
  margin-right: 10px;
  position: relative;
  white-space: nowrap;
  &:after {
    content: '-';
    position: absolute;
    line-height: 0;
    left: -20px;
    top: 5px;
    font-size: 30px;
    color: ${prop => prop.color};
  }
`;

export default ChartLegend;
