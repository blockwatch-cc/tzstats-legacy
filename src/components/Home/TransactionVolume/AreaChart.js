import React from 'react';
import { utcFormat } from 'd3-time-format';
import { scaleTime } from 'd3-scale';
import { curveLinear } from 'd3-shape';
import {  MouseCoordinateX } from 'react-stockcharts/lib/coordinates';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import _ from 'lodash';
import { format } from 'd3-format';
import { CurrentCoordinate } from '../../Common';
import { formatCurrencyShort } from '../../../utils';
import { defaultFont } from '../../../config';

class AreaChart extends React.Component {
  render() {
    const { data, width } = this.props;
    const max = _.maxBy(data, function(o) {
      return o.value;
    }).value;
    // const min = _.minBy(data, function(o) {
    //   return o.value;
    // }).value;

    return (
      <ChartCanvas
        height={180}
        width={width - 120}
        seriesName={''}
        ratio={2}
        margin={{
          left: 0,
          right: 40,
          top: 0,
          bottom: 0,
        }}
        data={data}
        type={'svg'}
        panEvent={panEvent}
        zoomEvent={zoomEvent}
        clamp={clamp}
        xAccessor={d => d && d.time}
        displayXAccessor={d => d && d.time}
        xScale={scaleTime()}
      >
        <Chart id={0} opacity={1} height={180} yExtents={[d => [max * 1.1, 0]]}>
          <YAxis
            axisAt="right"
            orient="right"
            ticks={0}
            tickFormat={x => format('~s')(x) + 'XTZ'}
            innerTickSize={-width + 160}
            tickStrokeDasharray={'Solid'}
            tickStrokeOpacity={0.3}
            tickStrokeWidth={1}
            tickStroke={'rgba(255, 255, 255, 0.82)'}
            fontWeight={300}
            fontSize={11}
            strokeWidth={0}
            fontFamily={defaultFont}
          />

          <MouseCoordinateX
            opacity={1}
            at="bottom"
            orient="bottom"
            dx={180}
            fill="rgba(0,0,0,0)"
            textFill="rgba(255, 255, 255, 0.82)"
            displayFormat={utcFormat('%a, %b %d')}
            fontSize={11}
            fontFamily={defaultFont}
          />

          <AreaSeries
            yAccessor={d => d.value}
            stroke="#29C0FF"
            fill="rgba(41, 192, 255, 0.2)"
            strokeWidth={2}
            interpolation={curveLinear}
          />
          <CurrentCoordinate displayFormat={formatCurrencyShort} r={3} yAccessor={d => d.value} fill={'#FFF'} />
        </Chart>
      </ChartCanvas>
    );
  }
}

const zoomEvent = false;
const panEvent = false;
const clamp = false;

export default fitWidth(AreaChart);
