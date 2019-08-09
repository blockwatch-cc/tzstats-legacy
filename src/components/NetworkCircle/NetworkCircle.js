import React from 'react';
import styled from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';
import SegmentedProgressbar from './SegmentedProgressbar.js';
import { convertMinutes } from '../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox } from '../Common';
const NetworkCircle = props => {
  const [chain] = useGlobal('chain');

  let diff = (Date.now() - new Date(chain.timestamp))/60000;
  const time = convertMinutes((chain.cycle + 1) * 4096 - chain.height - diff);
  return (
    <Card interactive={true} elevation={Elevation.ZERO}>
      <Wrapper>
        <DataBox titleSize={'12px'} title={'Main Network'} />
        <Container style={{ width: '200px', height: '200px' }}>
          <SegmentedProgressbar percentage={((chain.height % 4096) / 4096) * 100 || 0} circleNumber={chain.cycle} />
        </Container>
        {time}
      </Wrapper>
    </Card>
  );
};
function Container(props) {
  return <div style={Object.assign({}, props.style)}>{props.children}</div>;
}
const Wrapper = styled.div`
      margin: 0px -20px;
      text-align: center;
    `;

export default NetworkCircle;
