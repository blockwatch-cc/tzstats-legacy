import React from 'react';
import { timeFormat } from 'd3-time-format';
import { curveLinear } from 'd3-shape';
import { MouseCoordinateX } from 'react-stockcharts/lib/coordinates';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';
import _ from 'lodash';
import { format } from 'd3-format';
import CurrentCoordinate from '../../../Common/CurrentCoordinate';
import { defaultFont } from '../../../../config';

class BalanceChart extends React.Component {
  render() {
    const { data: initialData, width, ratio } = this.props;

    const max = _.maxBy(initialData, d => d.value).value;
    let min = _.minBy(initialData, d => d.value).value;
    min = min < 0.5 * max || min < 100 ? 0 : min;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.time));
    let { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 70)]);

    const xExtents = [start, end];
    const zoomEvent = false;
    const panEvent = false;
    const clamp = false;
    const zoomAnchor = function(e) {};

    function formatC(x) {
      return format(',.2f')(x)+' XTZ';
    }

    return (
      <ChartCanvas
        height={180}
        width={width}
        seriesName={''}
        margin={{
          left: 0,
          right: 0,
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
        <Chart id={1} height={180} yExtents={[d => [max * 1.05, min * 0.95]]}>
          <MouseCoordinateX
            opacity={1}
            at="bottom"
            orient="bottom"
            dx={180}
            fill="rgba(0,0,0,0)"
            textFill="rgba(255, 255, 255, 0.82)"
            displayFormat={timeFormat('%a, %b %d')}
            fontSize={11}
            fontFamily={defaultFont}
          />

          <AreaSeries
            yAccessor={d => d.value}
            stroke={'#17eef4'}
            fill={'rgba(23, 238, 244, 0.2)'}
            strokeWidth={2}
            interpolation={curveLinear}
          />
          <CurrentCoordinate displayFormat={formatC} r={3} yAccessor={d => d.value} fill={'#FFF'} />
        </Chart>
      </ChartCanvas>
    );
  }
}

export default fitWidth(BalanceChart);
