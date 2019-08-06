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

class BalanceChart extends React.Component {
  render() {
    const { data, width } = this.props;
    const max = _.maxBy(data, function(o) {
      return o.value;
    }).value;

    return (
      <div style={{ height: 150, width: 300 }}>
        <ChartCanvas
          seriesName={''}
          ratio={1}
          height={150}
          width={width}
          margin={{
            left: 0,
            right: 50,
            top: 10,
            bottom: 20,
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
              <stop offset="0%" stopColor="#17eef4" stopOpacity={0.2} />
              <stop offset="50%" stopColor="#17eef4" stopOpacity={0.6} />
              <stop offset="75%" stopColor="#17eef4" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Chart id={0} opacity={1} height={120} origin={(w, h) => [0, 0]} yExtents={d => [d.value]}>
            <MouseCoordinateX
              opacity={1}
              at="bottom"
              orient="bottom"
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
              displayFormat={e => `${format('.4s')(e)} tz`}
            />
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
            <CrossHairCursor ratio={2} stroke="#FFFFFF" />
          </Chart>
        </ChartCanvas>
      </div>
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
