import React from 'react';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';
import { SingleValueTooltip } from 'react-stockcharts/lib/tooltip';
import { ChartCanvas, Chart, ZoomButtons } from 'react-stockcharts';
import { BarSeries, CandlestickSeries, StackedBarSeries, GenericChartComponent } from 'react-stockcharts/lib/series';
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
  const yaxis = ['04:00','12:00','20:00'];

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
      height={340}
      width={width}
      seriesName={''}
      margin={{
        left: 0,
        right: 55,
        top: 0,
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
      <Chart id={1} height={150} yExtents={[d => [d.high, d.low]]} >
        <MouseCoordinateY
          at="right"
          textFill="rgba(255, 255, 255, 0.52)"
          opacity={0}
          orient="right"
          displayFormat={format('$.2f')}
          fontSize={11}
          fontWeight={300}
          fontFamily={"-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif"}
        />
        <YAxis
          axisAt="right"
          orient="right"
          ticks={2}
          tickFormat={format('$.2f')}
          innerTickSize={-width + 45}
          tickPadding={15}
          tickStrokeDasharray={'Solid'}
          tickStrokeOpacity={0.3}
          tickStrokeWidth={1}
          tickStroke={'rgba(255, 255, 255, 0.52)'}
          fontWeight={300}
          fontSize={11}
          strokeWidth={0}
          fontFamily={"-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif"}
        />

        <CandlestickSeries
          clip={false}
          stroke={d => (d.close > d.open ? '#18ecf2' : '#858999')}
          opacity={1}
          wickStroke={d => (d.close > d.open ? '#18ecf2' : '#858999')}
          fill={d => (d.close > d.open ? '#18ecf2' : '#858999')}
        />
      </Chart>
      <Chart id={2} yExtents={d => d.vol_base} opacity={1} height={50} origin={(w, h) => [0, h-170]}>
        <MouseCoordinateY
          at="right"
          orient="right"
          textFill="rgba(255, 255, 255, 0.52)"
          opacity={0}
          lineStroke={'#858999'}
          displayFormat={format('$.4s')}
          fontSize={11}
          fontWeight={300}
          fontFamily={"-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif"}
        />
        <BarSeries
          clip={false}
          opacity={0.8}
          yAccessor={d => d.vol_base}
          fill={d => (d.close > d.open ? '#18ecf2' : '#858999')}
          stroke={false}
        />
      </Chart>
      <Chart id={3} yExtents={d => d.id} opacity={1} height={145} origin={(w, h) => [0, h-145]}>
        <MouseCoordinateX
          opacity={1}
          at="bottom"
          orient="bottom"
          dx={200}
          fill="rgba(0,0,0,0)"
          textFill="rgba(255, 255, 255, 0.52)"
          displayFormat={timeFormat('%a, %b %d')}
          fontSize={11}
          fontWeight={300}
          fontFamily={"-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif"}
        />
        <YAxis
          axisAt="right"
          orient="right"
          tickValues={[4,12,20]}
          tickFormat={d => yaxis[2-(d-4)/8]}
          opacity={0}
          strokeWidth={0}
          outerTickSize={0}
          innerTickSize={0}
          tickPadding={15}
          tickStrokeOpacity={0.3}
          tickStrokeWidth={1}
          tickStroke={'rgba(255, 255, 255, 0.52)'}
          fontSize={11}
          fontWeight={300}
          fontFamily={"-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif"}
         />
        <VolumeAnnotation maxValue={volumeMax} setCurrentValue={setCurrentValue} clip={false} />
      </Chart>
      <CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
    </ChartCanvas>
  );
};

export default fitWidth(PriceChart);
