import React from 'react';
import styled from 'styled-components';
import { Card, Elevation } from '@blueprintjs/core';
const healthMap = [
  { status: 'Very bad', color: '#8DC9FB', opacity: 0.15 },
  { status: 'Bad', color: '#79D0FC', opacity: 0.3 },
  { status: 'Normal', color: '#5BDBFD', opacity: 0.45 },
  { status: 'Good', color: '#49E1FD', opacity: 0.7 },
  { status: 'Excellent', color: '#1ADEFF', opacity: 1 },
];

const NetworkHealth = () => {
  const [healtIndex, setHealtIndex] = React.useState(4);
  return (
    <Wrapper>
      <Card interactive={true} elevation={Elevation.ZERO}>
        <Title>{healthMap[4].status} network health</Title>
        {healthMap.slice(0, healtIndex + 1).map((item, index) => (
          <NetworkHealthIndicator key={index} color={item.color} opacity={item.opacity} />
        ))}
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 10px;
`;
const Title = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.52);
`;
const Content = styled.span`
  font-size: 14px;
`;
const NetworkHealthIndicator = styled.div`
  height: 6px;
  width: 16px;
  opacity: ${prop => prop.opacity};
  margin-left: 5px;
  border-radius: 2px;
  display: inline-block;
  background-color: ${prop => prop.color};
`;
export default NetworkHealth;
