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
import CurrentCoordinate from '../../Common/CurrentCoordinate';

class BalanceChart extends React.Component {
  render() {
    const { data, width, ratio } = this.props;

    const max = _.maxBy(data, function(o) {
      return o.value;
    }).value;

    return (
      <ChartCanvas
        seriesName={''}
        ratio={ratio}
        width={width}
        height={150}
        margin={{
          left: 0,
          right: 50,
          top: 20,
          bottom: 10,
        }}
        data={data}
        type={'svg'}
        panEvent={panEvent}
        zoomEvent={zoomEvent}
        clamp={clamp}
        xAccessor={d => d && d.time}
        xScale={scaleTime()}
      >
        <defs>
          <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
            <stop offset="0%" stopColor="#17eef4" stopOpacity={0.4} />
            <stop offset="50%" stopColor="#17eef4" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#17eef4" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <Chart id={0} opacity={1} yExtents={d => [d.value + 2000, 0]}>
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
            displayFormat={e => formatCurrency(e, '.2s')}
          />
          <PriceCoordinate
            at="right"
            fontSize={11}
            orient="right"
            price={max + 2000}
            textFill="rgba(255, 255, 255, 0.52)"
            opacity={0}
            lineStroke={'#858999'}
            strokeDasharray="ShortDash"
            displayFormat={e => format('.2s')(max)}
          />
          <PriceCoordinate
            at="right"
            orient="right"
            price={0}
            fill="#858999"
            textFill="rgba(255, 255, 255, 0.52)"
            fontSize={11}
            opacity={0}
            lineStroke={'#858999'}
            strokeDasharray="ShortDash"
            displayFormat={format('.2s')}
          />
          <AreaSeries
            yAccessor={d => d.value}
            stroke="#17eef4"
            fill="url(#MyGradient)"
            strokeWidth={3}
            interpolation={curveNatural}
            canvasGradient={canvasGradient}
          />
          <CurrentCoordinate r={3} yAccessor={d => d.value} fill={'#424553'} />
          <CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
        </Chart>
      </ChartCanvas>
    );
  }
}
const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA('#17eef4', 0.2) },
  { stop: 0.7, color: hexToRGBA('#17eef4', 0.4) },
  { stop: 1, color: hexToRGBA('#17eef4', 0.8) },
]);
const zoomEvent = false;
const panEvent = false;
const clamp = false;

export default fitWidth(BalanceChart);
