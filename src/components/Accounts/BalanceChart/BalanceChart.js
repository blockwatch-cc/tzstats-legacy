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
import { formatCurrencyShort, formatCurrency } from '../../../utils';
import CurrentCoordinate from '../../Common/CurrentCoordinate';

class BalanceChart extends React.Component {
  render() {
    const { data: initialData, width, ratio } = this.props;

    const max = _.maxBy(initialData, function(o) {
      return o.value;
    }).value;
    const min = _.minBy(initialData, function(o) {
      return o.value;
    }).value;

    const yGrid = { innerTickSize: -width + 40 };
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
        height={180}
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
        <Chart id={1} height={180} yExtents={[d => [max * 1.2, 0]]}>
          <YAxis
            axisAt="right"
            orient="right"
            ticks={2}
            tickFormat={x => format('~s')(x) + 'ꜩ'}
            tickStrokeDasharray={'Solid'}
            tickStrokeOpacity={0.3}
            tickStrokeWidth={1}
            tickStroke={'rgba(255, 255, 255, 0.52)'}
            fontWeight={300}
            fontSize={11}
            {...yGrid}
            strokeWidth={0}
            fontFamily={"-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif"}
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
            fontFamily={"-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif"}
          />

          <AreaSeries
            yAccessor={d => d.value}
            stroke="#17eef4"
            fill="rgba(23, 238, 244, 0.2)"
            strokeWidth={2}
            interpolation={curveLinear}
          />
          <CurrentCoordinate displayFormat={format('$.2f')} r={3} yAccessor={d => d.value} fill={'#FFF'} />
        </Chart>

        <CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
      </ChartCanvas>
    );
  }
}

export default fitWidth(BalanceChart);
