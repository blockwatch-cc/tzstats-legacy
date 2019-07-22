import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ProgressBar = ({ settings }) => {
  return settings.map((item, i) => <ProgressBarItems key={i} {...item}></ProgressBarItems>);
};

const ProgressBarContainer = ({ settings }) => {
  return (
    <ProgressBarWrapper>
      {<ProgressBar settings={settings} />}
    </ProgressBarWrapper>
  );
};
const ProgressBarWrapper = styled.div`
  height: 25px;
  border-radius: 2px;
  width: 100%;
  background: inherit;
`;
const ProgressBarItems = styled.div`
  background: ${prop => prop.color};
  width: ${prop => prop.percent}%;
  border-right: 1px solid #424552;
  display: inline-block;
  min-height: 16px;
  border-radius: 2px;
`;

export default ProgressBarContainer;
