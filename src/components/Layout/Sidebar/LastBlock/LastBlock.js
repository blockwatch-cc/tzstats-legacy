import React from 'react';
import styled from 'styled-components';
import { timeAgo } from '../../../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox, FlexRowSpaceBetween, FlexColumn, LinkIcon } from '../../../Common';
import { withRouter, Link } from 'react-router-dom';

//todo add priori
const LastBlock = ({ history }) => {
  const [chain] = useGlobal('chain');
  return (
    <Wrapper>
      <Link to={`/${chain.block_hash}`}>
      <LinkIcon>&#x25E5;</LinkIcon>
      <Card interactive={true} elevation={Elevation.ZERO}>
        <FlexRowSpaceBetween>
          <FlexColumn>
            <DataBox
              valueSize="16px"
              title={`Latest Block seen ${timeAgo.format(new Date(chain.timestamp))}`}
              value={chain.height}
            />
          </FlexColumn>
        </FlexRowSpaceBetween>
      </Card>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  position: relative;
`;
export default withRouter(LastBlock);
