import React from 'react';
import styled from 'styled-components';
import { timeAgo } from '../../../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox, FlexColumn, LinkIcon } from '../../../Common';
import { withRouter, Link } from 'react-router-dom';

function calcAgo(last) {
  return timeAgo.format(new Date(last));
}

const LastBlock = ({ history }) => {
  const [chain] = useGlobal('chain');

  // ago update handling
  const [countInTimeout, setCountInTimeout] = React.useState(0);
  const [ago, setAgo] = React.useState(calcAgo(chain.timestamp));

  // update displayed time each 10 sec
  React.useEffect(() => {
    const diff = (60 - new Date().getSeconds())%10;
    let timer = setTimeout(() => {
      setCountInTimeout(c => c + 1);
    }, diff*1000);
    setAgo(calcAgo(chain.timestamp));
    return () => clearTimeout(timer);
  }, [countInTimeout, chain.timestamp, setAgo]);


  return (
    <Wrapper>
      <Link to={`/${chain.block_hash}`}>
      <LinkIcon>&#x25E5;</LinkIcon>
      <Card interactive={true} elevation={Elevation.ZERO}>
        <FlexColumn>
          <DataBox
            valueSize="16px"
            title={`Latest Block seen ${ago}`}
            value={chain.height}
          />
        </FlexColumn>
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
