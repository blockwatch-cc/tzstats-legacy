import React from 'react';
import styled from 'styled-components';
import { DataBox } from '.';

const Legend = ({ settings }) => {
  return (
    <LegendWrapper>
      <LegendContent settings={settings} />
    </LegendWrapper>
  );
};

const LegendContent = ({ settings }) => {
  return settings.map((item, i) => {
    return (
      <LegendItem key={i} {...item}>
        <DataBox
          valueType="currency-short"
          value={item.value}
          valueSize="14px"
          title={`${item.title} ${Math.round(item.percent)}%`}
        />
      </LegendItem>
    );
  });
};

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  margin-top: 30px;
`;

const LegendItem = styled.div`
  margin-left: 20px;
  min-width: 110px;
  &:after {
    content: '•';
    position: relative;
    left: -20px;
    bottom: 45px;
    font-size: 30px;
    color: ${prop => prop.color};
  }
`;

export default Legend;
