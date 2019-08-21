import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nest as d3Nest } from 'd3-collection';

import GenericChartComponent from 'react-stockcharts/lib/GenericChartComponent';
import { getAxisCanvas } from 'react-stockcharts/lib/GenericComponent';
import { hexToRGBA, functor } from 'react-stockcharts/lib/utils';

class ScatterSeries extends Component {
  constructor(props) {
    super(props);
    this.renderSVG = this.renderSVG.bind(this);
    this.drawOnCanvas = this.drawOnCanvas.bind(this);
  }
  drawOnCanvas(ctx, moreProps) {
    const { xAccessor } = moreProps;

    const points = helper(this.props, moreProps, xAccessor);

    drawOnCanvas(ctx, this.props, points);
  }
  renderSVG(moreProps) {
    const { className, markerProps } = this.props;
    const { xAccessor } = moreProps;

    const points = helper(this.props, moreProps, xAccessor);

    return (
      <g className={className}>
        {points.map((point, idx) => {
          const { marker: Marker } = point;
          return <Marker key={idx} {...markerProps} point={point} />;
        })}
      </g>
    );
  }
  render() {
    return (
      <GenericChartComponent
        clip={false}
        svgDraw={this.renderSVG}
        canvasDraw={this.drawOnCanvas}
        canvasToDraw={getAxisCanvas}
        drawOn={['pan']}
      />
    );
  }
}

ScatterSeries.propTypes = {
  className: PropTypes.string,
  yAccessor: PropTypes.func.isRequired,
  marker: PropTypes.func,
  markerProvider: PropTypes.func,
  markerProps: PropTypes.object,
};

ScatterSeries.defaultProps = {
  className: 'react-stockcharts-scatter',
};

function helper(props, moreProps, xAccessor) {
  const { yAccessor, markerProvider, markerProps } = props;
  let { marker: Marker } = props;
  const {
    xScale,
    chartConfig: { yScale },
    plotData,
  } = moreProps;

  if (!(markerProvider || Marker)) throw new Error('required prop, either marker or markerProvider missing');

  return plotData.map(d => {
    if (markerProvider) Marker = markerProvider(d);

    const mProps = { ...Marker.defaultProps, ...markerProps };

    const fill = functor(mProps.fill);
    const stroke = functor(mProps.stroke);

    return {
      x: xScale(xAccessor(d)),
      y: yScale(yAccessor(d)),

      stroke: stroke(d),
      datum: d,
      marker: Marker,
    };
  });
}

function drawOnCanvas(ctx, props, points) {
  const { markerProps } = props;

  const nest = d3Nest()
    .key(d => d.fill)
    .key(d => d.stroke)
    .entries(points);

  nest.forEach(fillGroup => {
    const { key: fillKey, values: fillValues } = fillGroup;

    if (fillKey !== 'none') {
      ctx.fillStyle = fillKey;
    }

    fillValues.forEach(strokeGroup => {
      const { values: strokeValues } = strokeGroup;

      strokeValues.forEach(point => {
        point.datum.data.map((item, index) => {
          let newPoint = { ...point };
          newPoint.y = point.y - index * 11;
          let invalidBlocks = item && item.length ? item.filter(d => d.isBad) : [];
          let color = !item ? '#525566' : invalidBlocks.length ? '#ED6290' : '#418BFD';
          newPoint.marker.drawOnCanvas({ ...point.marker.defaultProps, ...markerProps, fill: color }, newPoint, ctx);
        });
      });
    });
  });
}

export default ScatterSeries;
