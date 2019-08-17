import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const InvalidData = ({ title = 'Something went wrong' }) => {
  return (
    <Wrapper>
      <Card title={title}>
        <div style={{ fontSize: 18, margin: '40px auto', opacity: 0.3}}>
          <div>&nbsp;&nbsp;&nbsp;^-^</div>
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

export default InvalidData;
