import React from 'react';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series';
import { CrossHairCursor, MouseCoordinateY, MouseCoordinateX, PriceCoordinate } from 'react-stockcharts/lib/coordinates';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';
import _ from 'lodash';

const PriceChart = props => {
  const {
    type,
    data: initialData,
    ratio,
    width
  } = props;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
  let {
    data,
    xScale,
    xAccessor,
    displayXAccessor
  } = xScaleProvider(initialData);
  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [start, end];
  const clamp = false;
  const zoomEvent = true;
  const max = _.maxBy(data, function (o) { return o.high; }).high;
  const min = _.minBy(data, function (o) { return o.low; }).low;

  const zoomAnchor = function (e) { };

  const panEvent = false;
  return <ChartCanvas height={155}
    width={width}
    ratio={ratio}
    margin={{
      left: 50, right: 50, top: 0, bottom: 0
    }}
    type={type}
    seriesName="MSFT"
    data={data}
    panEvent={panEvent}
    zoomEvent={zoomEvent}
    clamp={clamp}
    zoomAnchor={zoomAnchor}
    xScale={xScale}
    xAccessor={xAccessor}
    displayXAccessor={displayXAccessor}
    xExtents={xExtents} >
    <Chart id={1} height={150} yExtents={[d => [d.high, d.low]]} padding={{
      top: 10,
      bottom: 75
    }}>
      <MouseCoordinateY at="right" orient="right" displayFormat={format('.2f')} />
      <PriceCoordinate
        at="right"
        orient="right"
        price={min}
        fill="#3e85f2"
        textFill="#FFFFFF"
        arrowWidth={8}
        fontSize={11}
        lineStroke={"#858999"}
        strokeDasharray="ShortDash"
        displayFormat={format(".2f")}
        rectWidth={40}
        rectHeight={18}
      />
      <PriceCoordinate
        at="right"
        orient="right"
        price={max}
        fill="#3e85f2"
        textFill="#FFFFFF"
        arrowWidth={8}
        strokeDasharray="ShortDash"
        displayFormat={format(".2f")}
        lineOpacity={0.2}
        lineStroke={"#858999"}
        fontSize={11}
        textFill={"#FFFFFF"}
        strokeOpacity={1}
        strokeWidth={1}
        rectWidth={40}
        rectHeight={18}
      />
      <CandlestickSeries stroke={d => d.close > d.open ? '#858999' : '#18ecf2'} opacity={1} wickStroke={d => d.close > d.open ? '#858999' : '#18ecf2'} fill={d => d.close > d.open ? '#858999' : '#18ecf2'} />
    </Chart>
    <Chart id={2} yExtents={d => d.volume} opacity={1} height={100} origin={(w, h) => [0, 35]}>
      <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat('%Y-%m-%d')} />
      <MouseCoordinateY at="left" orient="left" displayFormat={format('.4s')} />
      <BarSeries opacity={1} yAccessor={d => d.volume} fill={d => (d.close > d.open ? '#858999' : '#18ecf2')} stroke={false} />
    </Chart>

    <CrossHairCursor stroke="#FFFFFF" />
  </ChartCanvas >;
};

export default fitWidth(PriceChart);
