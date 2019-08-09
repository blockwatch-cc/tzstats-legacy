import React from 'react';
import styled from 'styled-components';
import { timeAgo } from '../../../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox, FlexRowSpaceBetween } from '../../../Common';
import { withRouter } from 'react-router-dom';

//todo add priori
const LastBlock = ({ history }) => {
  const [chain] = useGlobal('chain');
  const handleClick = () => {
    history.push(`/block/${chain.block_hash}`);
  };
  return (
    <Wrapper>
      <Card onClick={handleClick} interactive={true} elevation={Elevation.ZERO}>
        <FlexRowSpaceBetween>
          <DataBox type="title-bottom" valueSize="16px" title={`Last Block`} value={chain.height} />
          <DataBox type="title-bottom" valueSize="16px" title={`Priority`} value={0} />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;
export default withRouter(LastBlock);
