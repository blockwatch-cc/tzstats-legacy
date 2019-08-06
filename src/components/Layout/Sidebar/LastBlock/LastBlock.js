import React from 'react';
import styled from 'styled-components';
import { timeAgo } from '../../../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox } from '../../../Common';
import { withRouter } from 'react-router-dom';

const LastBlock = ({ history }) => {
  const [chain] = useGlobal('chain');
  const handleClick = () => {
    history.push(`/block/${chain.block_hash}`);
  };
  return (
    <Wrapper>
      <Card onClick={handleClick} interactive={true} elevation={Elevation.ZERO}>
        <DataBox
          type="title-bottom"
          title={`Last block created ${timeAgo.format(new Date(chain.timestamp))}`}
          value={chain.height}
        />
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px 0;
`;
export default withRouter(LastBlock);
