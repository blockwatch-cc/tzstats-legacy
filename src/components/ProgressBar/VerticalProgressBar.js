import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Popover from '../Popover';
import { DataBox } from '../Common'
import { formatCurrency } from '../../utils'

const ProgressBar = ({ settings }) => {
  return settings.map((item, i) => {
    return (
      <Wrapper key={i}>

        <ProgressBarEmpty  {...item} />
        <Popover content={<DataBox
          valueType="currency-fixed"
          value={item.value}
          title={`${item.id} ${item.percent}%`}
        />} placement="top">
          <ProgressBarItems  {...item} />
        </Popover>
      </Wrapper>
    )
  });
};

const VerticalProgressBar = ({ settings }) => {
  return (
    <ProgressBarWrapper>
      <ProgressBar settings={settings} />
    </ProgressBarWrapper>
  );
};
const ProgressBarWrapper = styled.div`
  border-radius: 2px;
  width: 100%;
  height: 154px;

  background: inherit;
  display:flex;
  flex-direction: row;
  justify-content:space-between;
`;
const ProgressBarItems = styled.div`
  background: ${prop => prop.color};
  height: ${prop => prop.percent}%;
  border-right: 1px solid #424552;
  min-width: 35px;
  border-radius: 2px;
`;

const ProgressBarEmpty = styled.div`
  height: ${prop => 100 - prop.percent}%;
  min-width: 16px;
  border-radius: 2px;
`;
const Wrapper = styled.div`

}
`
export default VerticalProgressBar;
