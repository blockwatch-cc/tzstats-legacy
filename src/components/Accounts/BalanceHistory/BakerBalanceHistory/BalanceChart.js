import React from 'react';
import { timeFormat } from 'd3-time-format';
import { curveLinear } from 'd3-shape';
import { MouseCoordinateX } from 'react-stockcharts/lib/coordinates';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import _ from 'lodash';
import { format } from 'd3-format';
import CurrentCoordinate from '../../../Common/CurrentCoordinate';
import { defaultFont } from '../../../../config';

class BalanceChart extends React.Component {
  render() {
    const { data: initialData, width, ratio } = this.props;

    const max = _.maxBy(initialData, d => d.total).total;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.time));
    let { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);

    const zoomEvent = false;
    const panEvent = false;
    const clamp = false;
    const zoomAnchor = function(e) {};

    function formatC(x) {
      return format(',.2f')(x)+'tz';
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
      >
        <Chart id={1} height={180} yExtents={[d => [max * 1.1, 0]]}>
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
            yAccessor={d => d.total}
            stroke={'#858999'}
            fill={'rgb(79,82,97, 0.8)'}
            strokeWidth={2}
            interpolation={curveLinear}
          />
          <AreaSeries
            yAccessor={d => d.balance}
            stroke={'#17eef4'}
            fill={'rgba(23, 238, 244, 0.2)'}
            strokeWidth={2}
            interpolation={curveLinear}
          />
          <AreaSeries
            yAccessor={d => d.deposit}
            stroke={'#22BAF8'}
            fill={'rgba(34, 186, 248, 0.2)'}
            strokeWidth={2}
            interpolation={curveLinear}
          />
          <AreaSeries
            yAccessor={d => d.reward}
            stroke={'#626977'}
            fill={'rgba(98, 105, 119, 0.2)'}
            strokeWidth={2}
            interpolation={curveLinear}
          />

          <CurrentCoordinate displayFormat={formatC} r={3} yAccessor={d => d.total} fill={'#FFF'} />
          <CurrentCoordinate displayFormat={formatC} r={3} yAccessor={d => d.balance} fill={'#FFF'} />
          <CurrentCoordinate displayFormat={formatC} r={3} yAccessor={d => d.deposit} fill={'#FFF'} />
          <CurrentCoordinate displayFormat={formatC} r={3} yAccessor={d => d.reward} fill={'#FFF'} />
        </Chart>
      </ChartCanvas>
    );
  }
}

export default fitWidth(BalanceChart);
