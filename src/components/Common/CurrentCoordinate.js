import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GenericChartComponent from 'react-stockcharts/lib/GenericChartComponent';
import { isNotDefined } from 'react-stockcharts/lib/utils';
import { getMouseCanvas } from 'react-stockcharts/lib/GenericComponent';
import { defaultFont } from '../../config';

class CurrentCoordinate extends Component {
  constructor(props) {
    super(props);
    this.renderSVG = this.renderSVG.bind(this);
    this.drawOnCanvas = this.drawOnCanvas.bind(this);
  }
  drawOnCanvas(ctx, moreProps) {
    const circle = helper(this.props, moreProps);
    if (!circle) return null;

    ctx.fillStyle = circle.fill;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, false);
    ctx.fill();
  }
  renderSVG(moreProps) {
    const { className, displayFormat } = this.props;

    const circle = helper(this.props, moreProps);
    if (!circle) return null;

    const fillColor = circle.fill instanceof Function ? circle.fill(moreProps.currentItem) : circle.fill;
    const dy = circle.y < 20 ? circle.y + 20 : circle.y - 10;
    const dx = circle.x;// < 20 ? circle.x + 25 : circle.x > moreProps.width - 20 ? circle.x - 25 : circle.x;
    const anchor = circle.x < 50 ? 'left' : circle.x > moreProps.width - 50 ? 'end' : 'middle';
    return (
      <>
        <circle
          strokeWidth={1}
          stroke="#fff"
          opacity={1}
          className={className}
          cx={circle.x}
          cy={circle.y}
          r={circle.r}
          fill={fillColor}
        />
        <text
          x={dx}
          textAnchor={anchor}
          fontFamily={defaultFont}
          fontSize="12px"
          dy={dy}
          opacity={1}
          fill="rgba(255, 255, 255, 0.82)"
        >
          {displayFormat(circle.yValue)}
        </text>
      </>
    );
  }
  render() {
    return (
      <GenericChartComponent
        svgDraw={this.renderSVG}
        canvasDraw={this.drawOnCanvas}
        canvasToDraw={getMouseCanvas}
        drawOn={['mousemove', 'pan']}
      />
    );
  }
}

CurrentCoordinate.propTypes = {
  yAccessor: PropTypes.func,
  r: PropTypes.number.isRequired,
  className: PropTypes.string,
  displayFormat: PropTypes.func.isRequired,
};

CurrentCoordinate.defaultProps = {
  r: 3,
  className: 'react-stockcharts-current-coordinate',
};

function helper(props, moreProps) {
  const { fill, yAccessor, r } = props;

  const {
    show,
    xScale,
    chartConfig: { yScale },
    currentItem,
    xAccessor,
  } = moreProps;

  if (!show || isNotDefined(currentItem)) return null;

  const xValue = xAccessor(currentItem);
  const yValue = yAccessor(currentItem);

  if (isNotDefined(yValue)) return null;

  const x = Math.round(xScale(xValue));
  const y = Math.round(yScale(yValue));

  return { x, y, r, fill, yValue };
}

export default CurrentCoordinate;
