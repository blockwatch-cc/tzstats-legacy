import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import CyclProgressbar from 'react-circular-progressbar';
import { FlexColumnSpaceBetween, FlexRowSpaceBetween } from '../../Common';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';
import { Link } from 'react-router-dom';

function LayeredProgressbar(props) {
  const { renderOverlays, cycle, isCurrent, ...otherProps } = props;

  const overlays = props.renderOverlays();
  return (
    <Wrapper>
      <ProgressBarWrapper>
        <CyclProgressbar {...otherProps} textForPercentage={null} />
      </ProgressBarWrapper>
      <Link to={`/cycle/${cycle.cycle}`}>
        <CycleBorderBox isCurrent={isCurrent} />
      </Link>
      {isCurrent && (
        <CycleDataBox>
          <FlexColumnSpaceBetween textAlign="right" minHeight="100%">
            <div>{timeFormat('%d %b, %H:%M')(new Date(cycle.start_time))}</div>
            <div>{format(',')(cycle.start_height)}</div>
          </FlexColumnSpaceBetween>
          <FlexColumnSpaceBetween minHeight="100%">
            <div>{timeFormat('%d %b, %H:%M')(new Date(cycle.end_time))}</div>
            <div>{format(',')(cycle.end_height)}</div>
          </FlexColumnSpaceBetween>
        </CycleDataBox>
      )}
      {overlays.map((overlay, index) => {
        return <Overlay key={index}>{overlay}</Overlay>;
      })}
    </Wrapper>
  );
}

function getRadialSeparators(numSeparators) {
  const degrees = 360 / numSeparators;
  return _.range(numSeparators / 2).map(index => <Separator degrees={index * degrees} />);
}

export default function CycleSegmentedBar(props) {
  return (
    <LayeredProgressbar
      percentage={props.percentage}
      background
      cycle={props.cycle}
      strokeWidth={14}
      isCurrent={props.isCurrent}
      styles={{
        background: {
          fill: '#444754',
        },
        path: {
          stroke: props.isCurrent ? '#17eef4' : '#29C0FF',
          strokeLinecap: 'butt',
        },
        trail: {
          stroke: '#525566',
        },
      }}
      renderOverlays={() =>
        getRadialSeparators(16).concat(
          <div style={{ textAlign: 'center', fontSize: 14, color: '#fff' }}>{props.cycle.cycle}</div>
        )
      }
    />
  );
}
const CycleDataBox = styled.div`
  position: absolute;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.52);
  width: 180px;
  height: 120px;
  margin: -10px -40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CycleBorderBox = styled.div`
  position: absolute;
  border: ${props => (props.isCurrent ? '1px solid' : 'none')};
  border-radius: 53px;
  width: 78px;
  height: 78px;
  top: 11px;
  left: 11px;
  z-index: 100;
  cursor: pointer;
  &:hover {
    border: 1px solid;
  }
`;

const Overlay = styled.div`
  position: absolute;
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;
const ProgressBarWrapper = styled.div`
  position: absolute;
`;
const Separator = styled.div`
  background: #444754;
  width: 1px;
  height: 75%;
  transform: rotate(${props => props.degrees}deg);
`;
const Line = styled.div`
  background: rgba(255, 255, 255, 0.52);
  width: 1px;
  height: 75%;
  transform: rotate(${props => props.degrees}deg);
`;
