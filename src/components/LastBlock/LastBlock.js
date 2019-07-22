import React from 'react';
import styled from 'styled-components';
import { timeAgo } from '../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox } from '../Common'

const LastBlock = () => {
  const [chain] = useGlobal('chain');

  return (
    <Wrapper>
      <Card interactive={true} elevation={Elevation.ZERO}>
        <DataBox title={`Last block created ${timeAgo.format(new Date(chain.timestamp))}`}
          value={chain.height}
          isBottom={false}
        />
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px 0;
`;
export default LastBlock;
