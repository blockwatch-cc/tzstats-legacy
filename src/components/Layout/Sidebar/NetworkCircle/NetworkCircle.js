import React from 'react';
import styled from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';
import SegmentedProgressbar from './SegmentedProgressbar.js';
import { convertMinutes } from '../../../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox, LinkIcon } from '../../../Common';
import { withRouter } from 'react-router-dom';

const NetworkCircle = ({ history }) => {
  const [chain] = useGlobal('chain');

  let diff = (Date.now() - new Date(chain.timestamp)) / 60000;
  const time = convertMinutes((chain.cycle + 1) * 4096 - chain.height - diff);

  const handleClick = () => {
    history.push(`/cycle/${chain.cycle}`);
  };
  return (
    <Wrapper>
      <Card onClick={handleClick} interactive={true} elevation={Elevation.ZERO}>
        <LinkIcon>&#x25E5;</LinkIcon>
        <SegmentWrapper>
          <Title>Main Network</Title>

          <Container style={{ marginLeft: 15, marginTop: -20, width: '170px', height: '170px' }}>
            <SegmentedProgressbar percentage={((chain.height % 4096) / 4096) * 100 || 0} circleNumber={chain.cycle} />
          </Container>
          <DataBox ta="center" title={'Until Cycle End'} valueType="text" value={`${time}`} />
        </SegmentWrapper>
      </Card>
    </Wrapper>
  );
};
function Container(props) {
  return <div style={Object.assign({}, props.style)}>{props.children}</div>;
}
const Wrapper = styled.div`
  /* ... */
  position: relative;
`;

const Title = styled.div`
  width: 100%;
  z-index: 100;
  position: relative;
  left: 0px;
  top: -10px;
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
`;
const SegmentWrapper = styled.div`
  margin: 0px -20px;
  text-align: center;
`;

export default withRouter(NetworkCircle);
