import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const IvalidData = ({ title = 'Something went wrong' }) => {
  return (
    <Wrapper>
      <Card title={title}>
        <div style={{ fontSize: 30, margin: 'auto', opacity: 0.3 }}>
          <div style={{ fontSize: 30, height: 30, marginLeft: 25 }}>^-^</div>
          <div>(◉∀◉)</div>
          <div>( )____)</div>
          <div>&nbsp;¯”¯”¯</div>
        </div>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin-top: 20px;
  font-size: 16px;
`;

export default IvalidData;
