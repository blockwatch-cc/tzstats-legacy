import React from 'react';
import styled from 'styled-components';
import { Card } from '../../Common'


const EmptyPeriod = ({ title }) => {

  return (
    <Wrapper>
      <Card title={title}>
        <div style={{ fontSize: 125, margin: 'auto', opacity: 0.3 }}>
          <img src="https://img.icons8.com/ios-glyphs/160/000000/sad.png">
          </img>
        </div>
      </Card>
    </Wrapper>)
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
  font-size: 16px;
`;

export default EmptyPeriod;

