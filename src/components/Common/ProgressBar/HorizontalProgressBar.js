import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ settings, height }) => {
  return settings.map((item, i) => (item.percent>0&&<ProgressBarItems height={height} key={i} {...item}></ProgressBarItems>));
};

const HorizontalProgressBar = ({ settings, delimiter, height = 15 }) => {
  return (
    <ProgressBarWrapper>
      {delimiter && <Delimiter delimiter={delimiter} />}
      <ProgressBar settings={settings} height={height} />
    </ProgressBarWrapper>
  );
};
const Delimiter = styled.span`
  height: 100%;
  z-index: 10;
  width: 1px;
  background: #424552;
  position: absolute;
  left: ${props => props.delimiter}%;
`;
const ProgressBarWrapper = styled.div`
  font-size: 0;
  border-radius: 2px;
  width: 100%;
  background: inherit;
  position: relative;
  margin-bottom: 3px;
  margin-top: 3px;
  &+&{
    margin-top: 7px;
  }
`;
const ProgressBarItems = styled.div`
  background: ${prop => prop.color};
  width: calc(${prop =>
    prop.percent < 1 && prop.percent > 0 ? 1 : prop.percent > 99 && prop.percent !== 100 ? 99 : prop.percent.toFixed(1)}%);
  border-right: 1px solid #424552;
  display: inline-block;
  min-height: ${props => props.height}px;
  border-radius: 2px;
`;

export default HorizontalProgressBar;
