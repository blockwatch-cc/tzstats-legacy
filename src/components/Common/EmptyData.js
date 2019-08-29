import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import { FlexColumnSpaceAround } from './index';

const EmptyData = ({ title = 'Something went wrong', height, text }) => {
  return (
      <Card title={title}>
        <FlexColumnSpaceAround height={height}>
          <div style={{ fontSize: 18, margin: '40px auto', opacity: 0.3}}>
            <div>&nbsp;&nbsp;&nbsp;^-^</div>
            <div>(◉∀◉)</div>
            <div>( )____)</div>
            <div>&nbsp;¯”¯”¯</div>
          </div>
          {text?(<Info>{text}</Info>):''}
        </FlexColumnSpaceAround>
      </Card>
  );
};

export default EmptyData;

const Info = styled.div`
  font-size: 12px;
`;
