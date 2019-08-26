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
  justify-content: left;
  margin-top: 5px;
`;

const LegendItem = styled.div`
  margin-right: 10px;
  margin-left: 15px;
  position: relative;
  &:after {
    content: '•';
    position: absolute;
    left: -15px;
    font-size: 25px;
    line-height: 0;
    top: 7px;
    color: ${prop => prop.color};
  }
`;

const LegendTitle = styled.div`
  position: relative;
  margin-left: 0;
  &:after {
    content: '•';
    position: absolute;
    right: -15px;
    font-size: 25px;
    line-height: 0;
    top: 4px;
    color: ${prop => prop.color};
  }
`;

export default Legend;
