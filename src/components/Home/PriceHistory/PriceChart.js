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
import { format } from 'd3-format';
import { CurrentCoordinate } from '../../Common';
import { defaultFont } from '../../../config';

const PriceChart = React.forwardRef((props, ref) => {
  const { type, data: initialData, ratio, width } = props;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.time));
  let { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);

  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 70)]);

  const xExtents = [start, end];
  const zoomEvent = false;
  const panEvent = false;
  const clamp = false;
  const zoomAnchor = function(e) {};

  return (
    <ChartCanvas
      ref={ref}
      height={180}
      width={width - 120}
      seriesName={''}
      margin={{
        left: 0,
        right: 40,
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
      <Chart id={1} height={180} yExtents={[d => [d.high, d.low]]}>
        <YAxis
          axisAt="right"
          orient="right"
          ticks={2}
          tickFormat={format('$.2f')}
          innerTickSize={-width + 160}
          tickStrokeDasharray={'Solid'}
          tickStrokeOpacity={0.3}
          tickStrokeWidth={1}
          tickStroke={'rgba(255, 255, 255, 0.52)'}
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
          textFill="rgba(255, 255, 255, 0.52)"
          displayFormat={timeFormat('%a, %b %d')}
          fontSize={11}
          fontFamily={defaultFont}
        />

        <AreaSeries
          yAccessor={d => d.close}
          stroke="#17eef4"
          fill="rgba(23, 238, 244, 0.2)"
          strokeWidth={2}
          interpolation={curveLinear}
        />
        <CurrentCoordinate displayFormat={format('$.2f')} r={3} yAccessor={d => d.close} fill={'#FFF'} />
      </Chart>

      <CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
    </ChartCanvas>
  );
});

export default fitWidth(PriceChart);
