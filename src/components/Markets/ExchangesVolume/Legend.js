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
  margin-left: 40px;
`;
const LegendItem = styled.div`
  margin-bottom: -28px;
  margin-left: 20px;
  white-space: nowrap;
  min-width: 130px;
  &:after {
    content: '•';
    position: relative;
    left: -20px;
    bottom: 28px;
    font-size: 30px;
    color: ${prop => prop.color};
  }
`;

export default Legend;
