import React from 'react';
import styled from 'styled-components';
import { DataBox } from '../../Common';

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
          key={i}
          type="horizontal-value-as-title"
          title={item.id}
          valueType="currency-short"
          valueSize="12px"
          value={item.value}
        />
      </LegendItem>
    );
  });
};

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const LegendItem = styled.div`
  margin-bottom: -30px;
  margin-left: 20px;
  min-width: 130px;
  &:after {
    content: '•';
    position: relative;
    left: -20px;
    bottom: 30px;
    font-size: 30px;
    color: ${prop => prop.color};
  }
`;

export default Legend;
