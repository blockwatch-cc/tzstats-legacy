import React from 'react';
import _ from 'lodash';
import CircularProgressbar from 'react-circular-progressbar';

function LayeredProgressbar(props) {
  const { renderOverlays, ...otherProps } = props;
  const overlayStyles = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const overlays = props.renderOverlays();
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ position: 'absolute' }}>
        <CircularProgressbar {...otherProps} textForPercentage={null} />
      </div>
      {overlays.map((overlay, index) => (
        <div style={overlayStyles} key={index}>
          {overlay}
        </div>
      ))}
    </div>
  );
}

function RadialSeparator(props) {
  return (
    <div
      style={{
        background: '#4c4f5e',
        width: '1px',
        height: '75%',
        transform: `rotate(${props.degrees}deg)`,
      }}
    />
  );
}

function getRadialSeparators(numSeparators) {
  const degrees = 360 / numSeparators;
  return _.range(numSeparators / 2).map(index => <RadialSeparator degrees={index * degrees} />);
}

export default function SegmentedProgressbar(props) {
  return (
    <LayeredProgressbar
      percentage={props.percentage}
      background
      strokeWidth={14}
      styles={{
        background: {
          fill: '#4c4f5e',
        },
        path: {
          stroke: '#17eef4',
          strokeLinecap: 'butt',
        },
        trail: {
          stroke: '#525566',
        },
      }}
      renderOverlays={() =>
        getRadialSeparators(16).concat(
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 20, color: '#fff' }}>{props.circleNumber}</span>
            <p>
              <span style={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.52)' }}>XTZ</span>
            </p>
          </div>
        )
      }
    />
  );
}
