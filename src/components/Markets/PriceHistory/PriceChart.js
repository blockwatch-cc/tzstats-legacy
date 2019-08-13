import React from 'react';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';
import { SingleValueTooltip } from 'react-stockcharts/lib/tooltip';
import { ChartCanvas, Chart, ZoomButtons } from 'react-stockcharts';
import { BarSeries, CandlestickSeries, StackedBarSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  MouseCoordinateY,
  MouseCoordinateX,
  PriceCoordinate,
} from 'react-stockcharts/lib/coordinates';
import { LabelAnnotation, Label, Annotate } from 'react-stockcharts/lib/annotation';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';
import _ from 'lodash';
import VolumeAnnotation from './VolumeAnnotation';

const PriceChart = props => {
  const { type, data: initialData, ratio, width, volumeMax, setCurrentValue } = props;

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
      height={310}
      width={width}
      seriesName={''}
      margin={{
        left: 0,
        right: 55,
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
      <Chart id={1} height={75} yExtents={[d => [d.high, d.low]]}>
        <MouseCoordinateY
          fontSize={11}
          at="right"
          textFill="rgba(255, 255, 255, 0.52)"
          opacity={0}
          orient="right"
          displayFormat={format('$.2f')}
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
          displayFormat={format('$.2f')}
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
          displayFormat={format('$.2f')}
        />
        <CandlestickSeries
          stroke={d => (d.close > d.open ? '#18ecf2' : '#858999')}
          opacity={1}
          wickStroke={d => (d.close > d.open ? '#18ecf2' : '#858999')}
          fill={d => (d.close > d.open ? '#18ecf2' : '#858999')}
        />
      </Chart>
      <Chart id={2} yExtents={d => d.vol_base} opacity={1} height={55} origin={(w, h) => [0, 95]}>
        <MouseCoordinateY
          at="right"
          orient="right"
          textFill="rgba(255, 255, 255, 0.52)"
          opacity={0}
          lineStroke={'#858999'}
          displayFormat={format('$.4s')}
        />
        <BarSeries
          opacity={0.8}
          yAccessor={d => d.vol_base}
          fill={d => (d.close > d.open ? '#18ecf2' : '#858999')}
          stroke={false}
        />
      </Chart>
      <Chart id={3} yExtents={d => d.id} opacity={1} height={200} origin={(w, h) => [0, 80]}>
        <YAxis showTicks={false} showTickLabel={false} value axisAt="right" orient="right" opacity={0} />
        <PriceCoordinate
          at="right"
          orient="right"
          price={3}
          fill="#858999"
          textFill="rgba(255, 255, 255, 0.52)"
          fontSize={11}
          opacity={0}
          lineStroke={'#858999'}
          strokeDasharray="ShortDash"
          displayFormat={d => '20:00'}
        />
        <PriceCoordinate
          at="right"
          orient="right"
          price={9}
          fill="#858999"
          textFill="rgba(255, 255, 255, 0.52)"
          fontSize={11}
          opacity={0}
          lineStroke={'#858999'}
          strokeDasharray="ShortDash"
          displayFormat={d => '12:00'}
        />
        <PriceCoordinate
          at="right"
          orient="right"
          price={14.75}
          fill="#858999"
          textFill="rgba(255, 255, 255, 0.52)"
          fontSize={11}
          opacity={0}
          lineStroke={'#858999'}
          strokeDasharray="ShortDash"
          displayFormat={d => '04:00'}
        />
        <VolumeAnnotation maxValue={volumeMax} setCurrentValue={setCurrentValue} />
      </Chart>
      <CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
    </ChartCanvas>
  );
};

export default fitWidth(PriceChart);
