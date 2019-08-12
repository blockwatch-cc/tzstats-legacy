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
import { LineSeries, AreaSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { LabelAnnotation, Label, Annotate } from 'react-stockcharts/lib/annotation';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';
import { createVerticalLinearGradient, hexToRGBA } from 'react-stockcharts/lib/utils';
import _ from 'lodash';
import { format } from 'd3-format';
import { formatCurrency } from '../../../utils';
import { CurrentCoordinate } from '../../Common';

const PriceChart = props => {
  const { type, data: initialData, ratio, width } = props;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.time));
  let { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);

  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 70)]);

  const xExtents = [start, end];

  const zoomEvent = false;
  const max = _.maxBy(data, function(o) {
    return o.high;
  }).high;
  const min = _.minBy(data, function(o) {
    return o.low;
  }).low;

  const panEvent = false;
  const clamp = false;
  const zoomAnchor = function(e) {};

  return (
    <ChartCanvas
      height={170}
      width={width - 120}
      seriesName={''}
      margin={{
        left: 0,
        right: 50,
        top: 30,
        bottom: 0,
      }}
      type={type}
      ratio={ratio}
      data={data}
      panEvent={panEvent}
      zoomEvent={zoomEvent}
      clamp={clamp}
      zoomAnchor={zoomAnchor}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <defs>
        <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
          <stop offset="0%" stopColor="#17eef4" stopOpacity={0.2} />
          <stop offset="50%" stopColor="#17eef4" stopOpacity={0.2} />
          <stop offset="75%" stopColor="#17eef4" stopOpacity={0.2} />
        </linearGradient>
      </defs>
      <Chart id={1} height={140} yExtents={[d => [d.high, 0]]}>
        <MouseCoordinateY
          at="right"
          orient="right"
          textFill="rgba(255, 255, 255, 0.52)"
          opacity={0}
          lineStroke={'#858999'}
          displayFormat={format('$.2')}
        />
        <MouseCoordinateX
          opacity={1}
          at="top"
          orient="top"
          dx={200}
          fill="#424552"
          textFill="rgba(255, 255, 255, 0.52)"
          displayFormat={timeFormat('%a, %B %d')}
        />

        <PriceCoordinate
          at="right"
          orient="right"
          price={(max / 3).toFixed(1)}
          fill="#858999"
          textFill="rgba(255, 255, 255, 0.52)"
          fontSize={11}
          opacity={0}
          lineOpacity={0.3}
          lineStroke={'#858999'}
          strokeDasharray="Solid"
          displayFormat={format('$.2f')}
        />
        <PriceCoordinate
          at="right"
          orient="right"
          price={((2 * max) / 3).toFixed(1)}
          fill="#858999"
          textFill="rgba(255, 255, 255, 0.52)"
          fontSize={11}
          opacity={0}
          lineOpacity={0.3}
          lineStroke={'#858999'}
          strokeDasharray="Solid"
          displayFormat={format('$.2f')}
        />
        <PriceCoordinate
          at="right"
          orient="right"
          price={max.toFixed(1)}
          fill="#858999"
          textFill="rgba(255, 255, 255, 0.52)"
          fontSize={11}
          opacity={0}
          lineOpacity={0.3}
          lineStroke={'#858999'}
          strokeDasharray="Solid"
          displayFormat={format('$.2f')}
        />
        <AreaSeries
          yAccessor={d => d.open}
          stroke="#17eef4"
          fill="url(#MyGradient)"
          strokeWidth={3}
          interpolation={curveLinear}
          canvasGradient={canvasGradient}
        />
        <CurrentCoordinate r={3} yAccessor={d => d.open} fill={'#424553'} />
      </Chart>

      <CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
    </ChartCanvas>
  );
};
const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA('#17eef4', 0.2) },
  { stop: 0.7, color: hexToRGBA('#17eef4', 0.2) },
  { stop: 1, color: hexToRGBA('#17eef4', 0.2) },
]);

export default fitWidth(PriceChart);
