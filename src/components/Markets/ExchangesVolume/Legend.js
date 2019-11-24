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
          titleSize="12px"
          valueType="currency"
          valueOpts={{digits:3,dim:0}}
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
  margin-left: 20px;
  white-space: nowrap;
  min-width: 130px;
  &:after {
    content: '';
    position: relative;
    left: -20px;
    bottom: 12px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${prop => prop.color};
    display: block;
  }
`;

export default Legend;
