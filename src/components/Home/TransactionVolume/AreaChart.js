import React from 'react';
import PropTypes from 'prop-types';
import { timeFormat } from 'd3-time-format';
import { scaleTime } from 'd3-scale';
import { curveMonotoneX, curveNatural, curveLinear } from 'd3-shape';
import {
  CrossHairCursor,
  MouseCoordinateY,
  MouseCoordinateX,
  PriceCoordinate,
} from 'react-stockcharts/lib/coordinates';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { LabelAnnotation, Label, Annotate } from 'react-stockcharts/lib/annotation';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';
import { createVerticalLinearGradient, hexToRGBA } from 'react-stockcharts/lib/utils';
import _ from 'lodash';
import { format } from 'd3-format';
import { CurrentCoordinate } from '../../Common';
class AreaChart extends React.Component {
  render() {
    const { data, width, setCurrentValue } = this.props;
    const max = _.maxBy(data, function(o) {
      return o.value;
    }).value;
    const min = _.minBy(data, function(o) {
      return o.value;
    }).value;

    return (
      <ChartCanvas
        seriesName={''}
        ratio={2}
        height={105}
        width={width}
        margin={{
          left: 0,
          right: 50,
          top: 30,
          bottom: 0,
        }}
        data={data}
        type={'svg'}
        panEvent={panEvent}
        zoomEvent={zoomEvent}
        clamp={clamp}
        xAccessor={d => d && d.time}
        xScale={scaleTime()}
      >
        <Chart id={0} opacity={1} height={70} yExtents={[d => [max + 2000000, min - 2000000]]}>
          <defs>
            <linearGradient id="MyGradient2" x1="0" y1="100%" x2="0" y2="0%">
              <stop offset="0%" stopColor="#29C0FF" stopOpacity={0.4} />
              <stop offset="50%" stopColor="#29C0FF" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#29C0FF" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <PriceCoordinate
            at="right"
            fontSize={11}
            orient="right"
            price={max}
            textFill="rgba(255, 255, 255, 0.52)"
            opacity={0}
            lineStroke={'#858999'}
            strokeDasharray="ShortDash"
            displayFormat={format('.2s')}
          />
          <PriceCoordinate
            at="right"
            orient="right"
            price={min}
            fill="#858999"
            textFill="rgba(255, 255, 255, 0.52)"
            fontSize={11}
            opacity={0}
            lineStroke={'#858999'}
            strokeDasharray="ShortDash"
            displayFormat={format('.2s')}
          />

          <MouseCoordinateX
            opacity={1}
            at="top"
            orient="top"
            dx={200}
            fill="#424552"
            textFill="rgba(255, 255, 255, 0.52)"
            displayFormat={timeFormat('%a, %d %B')}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            textFill="rgba(255, 255, 255, 0.52)"
            opacity={0}
            lineStroke={'#858999'}
            displayFormat={format('.2s')}
          />

          <AreaSeries
            yAccessor={d => d.value}
            stroke="#29C0FF"
            fill="url(#MyGradient2)"
            strokeWidth={3}
            interpolation={curveLinear}
            canvasGradient={canvasGradient}
          />
          <CrossHairCursor ratio={2} stroke="#FFFFFF" />
          <CurrentCoordinate
            r={3}
            yAccessor={d => {
              setCurrentValue(d);
              return d.value;
            }}
            fill={'#424553'}
          />
        </Chart>
      </ChartCanvas>
    );
  }
}

const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA('#29C0FF', 0.8) },
  { stop: 0.7, color: hexToRGBA('#29C0FF', 0.8) },
  { stop: 1, color: hexToRGBA('#29C0FF', 0.8) },
]);

const zoomEvent = false;
const panEvent = false;
const clamp = false;

export default fitWidth(AreaChart);
