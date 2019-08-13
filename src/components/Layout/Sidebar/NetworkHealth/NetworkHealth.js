import React from 'react';
import styled from 'styled-components';
import { useGlobal } from 'reactn';
import { Card, Elevation, Keys } from '@blueprintjs/core';
import { getNetworkHealthStatus } from '../../../../utils';

const NetworkHealth = () => {
  const [chain] = useGlobal('chain');
  const status = getNetworkHealthStatus(chain.health);
  return (
    <Wrapper>
      <Card interactive={true} elevation={Elevation.ZERO}>
        <Title>{status.name} Network Health</Title>
        {[...new Array(6).keys()].map((item, i) => {
          return <NetworkHealthIndicator isEmpty={i + 1 > status.value} key={i} />;
        })}
      </Card>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 10px 0;
`;
const Title = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.52);
`;

const NetworkHealthIndicator = styled.div`
  height: 8px;
  width: 20px;
  margin-left: 1px;
  display: inline-block;
  background-color: ${props => (props.isEmpty ? '#525566' : ' #26B2EE')};
`;
export default NetworkHealth;
