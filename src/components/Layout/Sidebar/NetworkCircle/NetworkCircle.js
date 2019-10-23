import React from 'react';
import styled from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';
import SegmentedProgressbar from './SegmentedProgressbar.js';
import { convertMinutes } from '../../../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox, LinkIcon } from '../../../Common';
import { withRouter, Link } from 'react-router-dom';

const NetworkCircle = ({ history }) => {
  const [chain] = useGlobal('chain');
  const [config] = useGlobal('config');

  let diff = (Date.now() - new Date(chain.timestamp)) / (config.time_between_blocks[0]*1000);
  const time = convertMinutes((chain.cycle + 1) * config.blocks_per_cycle - chain.height - diff);

  return (
    <Wrapper>
      <Link to={`/cycle/${chain.cycle}`}>
      <Card  interactive={true} elevation={Elevation.ZERO}>
        <LinkIcon>&#x25E5;</LinkIcon>
        <SegmentWrapper>
          <Title>{`${chain.name||'Network'} ${chain.network||'Unknown'}`}</Title>
          <Container style={{ marginLeft: 15, marginTop: -20, width: '170px', height: '170px' }}>
            <SegmentedProgressbar percentage={((chain.height % config.blocks_per_cycle) / config.blocks_per_cycle) * 100 || 0} circleNumber={chain.cycle} />
          </Container>
          <DataBox ta="center" title={'Until Cycle End'} valueType="text" value={`${time}`} />
        </SegmentWrapper>
      </Card>
      </Link>
    </Wrapper>
  );
};
function Container(props) {
  return <div style={Object.assign({}, props.style)}>{props.children}</div>;
}
const Wrapper = styled.div`
  position: relative;
`;

const Title = styled.div`
  width: 100%;
  z-index: 100;
  position: relative;
  left: 0px;
  top: -10px;
  color: rgba(255, 255, 255, 0.52);
  font-size: 12px;
`;
const SegmentWrapper = styled.div`
  margin: 0px -20px;
  text-align: center;
`;

export default withRouter(NetworkCircle);
