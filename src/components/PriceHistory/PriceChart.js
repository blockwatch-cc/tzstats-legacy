import React from 'react';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';

import { ChartCanvas, Chart, ZoomButtons } from 'react-stockcharts';
import { BarSeries, CandlestickSeries, StackedBarSeries } from 'react-stockcharts/lib/series';
import { CrossHairCursor, MouseCoordinateY, MouseCoordinateX, PriceCoordinate } from 'react-stockcharts/lib/coordinates';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';
import _ from 'lodash';
import { set } from "d3-collection";
import { scaleOrdinal, scalePoint, scaleLinear } from "d3-scale";
const PriceChart = props => {
  const {
    type,
    data: initialData,
    ratio,
    width
  } = props;
  const [data1, setData] = React.useState({ suffix: 1 });

  let handleReset = (e) => {

    setData({
      suffix: data1.suffix + 1
    });
  }

  let barSize = 200;
  let bars = [1, 3, 13, 0.3]

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
  let {
    data,
    xScale,
    xAccessor,
    displayXAccessor
  } = xScaleProvider(initialData);

  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 70)]);

  const xExtents = [start, end];
  const clamp = false;
  const zoomEvent = function (e) { };
  const max = _.maxBy(data, function (o) { return o.high; }).high;
  const min = _.minBy(data, function (o) { return o.low; }).low;

  const zoomAnchor = function (e) { };
  const bar_colors = [
    '#2FC260',     // unrealized loss
    '#FF4141',     // unrealized profit
    '#fa0',     // realized available cash
    '#3df',     // locked cash
    '#94f',     // occupied cash
    '#fff',
    '#025602',
    '#11dd11',
    '#94f',     // occupied cash
    '#fff',  // commission
  ]


  const fill = (d, i) => {

    return bar_colors[Math.floor(Math.random() * 10)];


  };

  const yAccessorArray = [];
  for (let i = 0; i < Object.keys(data[0]).length - 1; i++) {
    if (i % 2 === 1) {
      yAccessorArray[i] = (d) => barSize / 2;
    } else {
      yAccessorArray[i] = (d) => barSize;
    }

  }

  const panEvent = false;
  return (
    <ChartCanvas height={165}
      width={width}
      margin={{
        left: 0, right: 50, top: 30, bottom: 0
      }}
      type={type}
      ratio={2}
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
      <Chart id={1}
        height={55}
        yExtents={[d => [d.high, d.low]]}
      >
        <MouseCoordinateY
          fontSize={11}
          at="right"
          textFill="rgba(255, 255, 255, 0.52)"
          opacity={0}
          orient="right"
          displayFormat={format('$.2f')}
        />

        <PriceCoordinate
          at="right"
          orient="right"
          price={min}
          fill="#858999"
          textFill="rgba(255, 255, 255, 0.52)"
          fontSize={11}
          opacity={0}
          lineStroke={"#858999"}
          strokeDasharray="ShortDash"
          displayFormat={format("$.2f")}
        />

        <PriceCoordinate
          at="right"
          fontSize={11}
          orient="right"
          price={max}
          textFill="rgba(255, 255, 255, 0.52)"
          opacity={0}
          lineStroke={"#858999"}
          strokeDasharray="ShortDash"
          displayFormat={format("$.2f")}

        />
        <CandlestickSeries
          stroke={d => d.close > d.open ? '#18ecf2' : '#858999'}
          opacity={1}
          wickStroke={d => d.close > d.open ? '#18ecf2' : '#858999'}
          fill={d => d.close > d.open ? '#18ecf2' : '#858999'}
        />
      </Chart>
      <Chart id={2}
        yExtents={d => d.volume}
        opacity={1}
        height={55}
        origin={(w, h) => [0, 55]}
      >

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
          lineStroke={"#858999"}
          displayFormat={format('$.4s')}
        />
        <BarSeries
          opacity={0.8}
          yAccessor={d => d.volume}
          fill={d => (d.close > d.open ? '#18ecf2' : '#858999')}
          stroke={false} />
      </Chart>
      {/* <Chart id={3} heith={150}
        yExtents={[0, d => d.close + d.open]}>
        <StackedBarSeries
          stroke={false}
          yAccessor={[d => d.close, d => d.open]}
          opacity={1}
          fill={fill} />
      </Chart> */}
      <CrossHairCursor ratio={2} stroke="#FFFFFF" />
    </ChartCanvas >
  )
};

export default fitWidth(PriceChart);
