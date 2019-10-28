import React from 'react';
import styled from 'styled-components';
import { DataBox } from '../../Common';

const BarLegend = ({ settings }) => {
  return (
    <LegendWrapper>
      <LegendContent settings={settings} />
    </LegendWrapper>
  );
};

const LegendContent = ({ settings }) => {
  return settings.map((item, i) => {
    return item.percent > 0 ? (
      <LegendItem key={i} {...item}>
        <DataBox
          valueType="currency"
          valueOpts={{ digits: 4, dim: 0 }}
          value={item.value}
          valueSize="14px"
          title={`${item.title} ${Math.round(item.percent)}%`}
        />
      </LegendItem>
    ) : '';
  });
};

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  margin-top: 5px;
`;

const LegendItem = styled.div`
  margin-right: 7px;
  margin-left: 15px;
  position: relative;
  &:after {
    content: '•';
    position: absolute;
    left: -15px;
    font-size: 25px;
    line-height: 0;
    top: 7px;
    opacity: ${prop => (prop.opacity ? prop.opacity : 1)};
    color: ${prop => prop.color};
  }
`;

export default BarLegend;
