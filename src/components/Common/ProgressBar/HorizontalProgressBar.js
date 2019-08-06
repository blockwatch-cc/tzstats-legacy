import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ settings }) => {
  return settings.map((item, i) => <ProgressBarItems key={i} {...item}></ProgressBarItems>);
};

const HorizontalProgressBar = ({ settings, delimiter }) => {
  return (
    <ProgressBarWrapper>
      {delimiter && <Delimiter delimiter={delimiter} />}
      <ProgressBar settings={settings} />
    </ProgressBarWrapper>
  );
};
const Delimiter = styled.span`
  height: 25px;
  z-index: 10;
  width: 1px;
  background: #424552;
  position: absolute;
  left: ${props => props.delimiter}%;
`;
const ProgressBarWrapper = styled.div`
  height: 25px;
  border-radius: 2px;
  width: 100%;
  background: inherit;
  position: relative;
`;
const ProgressBarItems = styled.div`
  background: ${prop => prop.color};
  width: ${prop => (prop.percent < 1 ? 1 : prop.percent > 99 ? 99 : prop.percent)}%;
  border-right: 1px solid #424552;
  display: inline-block;
  min-height: 16px;
  border-radius: 2px;
`;

export default HorizontalProgressBar;
