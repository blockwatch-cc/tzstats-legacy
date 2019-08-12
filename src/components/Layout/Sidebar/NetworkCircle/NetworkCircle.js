import React from 'react';
import styled from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';
import SegmentedProgressbar from './SegmentedProgressbar.js';
import { convertMinutes } from '../../../../utils';
import { useGlobal } from 'reactn';
import { Card, Elevation } from '@blueprintjs/core';
import { DataBox } from '../../../Common';
import { withRouter } from 'react-router-dom';

const NetworkCircle = ({ history }) => {
  const [chain] = useGlobal('chain');

  let diff = (Date.now() - new Date(chain.timestamp)) / 60000;
  const time = convertMinutes((chain.cycle + 1) * 4096 - chain.height - diff);

  const handleClick = () => {
    history.push(`/cycle/${chain.cycle}`);
  };
  return (
    <Card onClick={handleClick} interactive={true} elevation={Elevation.ZERO}>
      <Wrapper>
        <Title>Main Network</Title>

        <Container style={{ marginLeft: 15, marginTop: -20, width: '170px', height: '170px' }}>
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
const Title = styled.div`
  width: 100%;
  z-index: 100;
  position: relative;
  left: 0px;
  top: -10px;
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
`;
const Wrapper = styled.div`
  margin: 0px -20px;
  text-align: center;
`;

export default withRouter(NetworkCircle);
