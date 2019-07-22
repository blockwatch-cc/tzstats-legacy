import React from 'react';
import styled from 'styled-components';
import { DataBox } from '../Common'


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
        <DataBox value={item.value}
          type="currency-short"
          prefix='.2s'
          title={`${item.title} ${Math.round(item.percent)}%`} />
      </LegendItem>)
  });
};

const LegendWrapper = styled.div`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: start;
    `;

const LegendItem = styled.div`
      margin-bottom: -30px;
      margin-left: 20px;
      min-width: 110px;
      &:after {
      content: '•';
      position: relative;
      left: -20px;
      bottom: 45px;
      font-size: 30px;
      color: ${ prop => prop.color};
    }
`;

export default Legend;
