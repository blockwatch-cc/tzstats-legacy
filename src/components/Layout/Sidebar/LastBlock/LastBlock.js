import React from 'react';
import styled from 'styled-components';
import { timeAgo } from '../../../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox, FlexRowSpaceBetween, FlexColumn } from '../../../Common';
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
          <FlexColumn>
            <DataBox
              type="title-bottom"
              valueSize="16px"
              title={`Last Block ${timeAgo.format(new Date(chain.timestamp))}`}
              value={chain.height}
            />
          </FlexColumn>
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
`;
export default withRouter(LastBlock);
