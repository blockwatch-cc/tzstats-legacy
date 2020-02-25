import React from 'react';
import { timeFormat } from 'd3-time-format';
import { curveLinear } from 'd3-shape';
import { CrossHairCursor, MouseCoordinateX } from 'react-stockcharts/lib/coordinates';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { YAxis } from 'react-stockcharts/lib/axes';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';
import _ from 'lodash';
import { format } from 'd3-format';
import CurrentCoordinate from '../Common/CurrentCoordinate';
import { defaultFont } from '../../config';
import { formatValue, makeid } from '../../utils';

class AreaChart extends React.Component {
  render() {
    const { data: initialData, width, ratio, settings } = this.props;

    const yGrid = { innerTickSize: -width + 40 };
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.time));
    let { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);

    const { max, min } = getMaxMin(data, settings.series);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 70)]);

    const xExtents = [start, end];
    const zoomEvent = false;
    const panEvent = false;
    const clamp = false;
    const zoomAnchor = function(e) {};
    const id = makeid(8);

    return (
      <ChartCanvas
        height={settings.height || 180}
        width={width}
        seriesName={''}
        margin={{
          left: 0,
          right: 40,
          top: 0,
          bottom: 0,
        }}
        type={'svg'}
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
        <Chart id={id} height={settings.height || 180} yExtents={[d => [max * 1.05, min * 0.95]]}>
          <YAxis
            axisAt="right"
            orient="right"
            ticks={4}
            tickFormat={x => format('~s')(x) + 'XTZ'}
            tickStrokeDasharray={'Solid'}
            tickStrokeOpacity={0.3}
            tickStrokeWidth={1}
            tickStroke={'rgba(255, 255, 255, 0.52)'}
            fontWeight={300}
            fontSize={11}
            {...yGrid}
            strokeWidth={0}
            fontFamily={defaultFont}
          />
          <MouseCoordinateX
            opacity={1}
            at="bottom"
            orient="bottom"
            dx={180}
            fill="rgba(0,0,0,0)"
            textFill="rgba(255, 255, 255, 0.52)"
            displayFormat={timeFormat('%a, %b %d')}
            fontSize={11}
            fontFamily={defaultFont}
          />
          {settings.series.map((item, key) => {
            return (
              <AreaSeries
                key={key}
                yAccessor={item.value}
                stroke={item.color}
                fill={item.fillColor}
                strokeWidth={2}
                interpolation={curveLinear}
              />
            );
          })}
          {settings.series.map((item, key) => {
            return (
              <CurrentCoordinate key={key} displayFormat={formatValue} r={3} yAccessor={item.value} fill={'#FFF'} />
            );
          })}
        </Chart>

        <CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
      </ChartCanvas>
    );
  }
}
function getMaxMin(data, series) {
  const res = series.reduce(
    (acc, cur) => {
      const max = cur.value(_.maxBy(data, cur.value));
      let min = cur.value(_.minBy(data, cur.value));
      min = min < 0.5 * max ? 0 : min;
      acc.min = min < acc.min ? min : acc.min;
      acc.max = max > acc.max ? max : acc.max;
      return acc;
    },
    { min: 0, max: 0 }
  );
  return res;
}

export default fitWidth(AreaChart);
