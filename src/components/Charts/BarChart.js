import React from 'react';
import PropTypes from 'prop-types';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
// import { set } from 'd3-collection';
import { last } from 'react-stockcharts/lib/utils';
// import { scaleOrdinal, schemeCategory10, scalePoint } from 'd3-scale';
import { MouseCoordinateX } from 'react-stockcharts/lib/coordinates';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { BarSeries } from 'react-stockcharts/lib/series';
import { YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { defaultFont } from '../../config';
import { formatValue, makeid } from '../../utils';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';
import _ from 'lodash';
import CurrentCoordinate from '../Common/CurrentCoordinate';

class BarChart extends React.Component {
  render() {
    let { data: initialData, type, width, ratio } = this.props;
    width = width - 70;
    const yGrid = { innerTickSize: -width + 40 };
    const max = _.maxBy(initialData, d => d.value).value;
    let min = _.minBy(initialData, d => d.value).value;
    min = min < 0.5 * max ? 0 : min;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.time));
    let { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);
    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 70)]);

    const xExtents = [start, end];
    const zoomAnchor = function(e) {};
    const zoomEvent = false;
    const panEvent = false;
    const clamp = false;
    const id = makeid(8);

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={180}
        seriesName={''}
        margin={{
          left: 0,
          right: 40,
          top: 0,
          bottom: 0,
        }}
        type={type}
        panEvent={panEvent}
        zoomEvent={zoomEvent}
        clamp={clamp}
        zoomAnchor={zoomAnchor}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        data={data}
      >
        <Chart id={id} yExtents={[d => [max * 1.05, min * 0.95]]}>
          <YAxis
            axisAt="right"
            orient="right"
            ticks={4}
            tickFormat={x => format('~s')(x) + 'XTZ'}
            tickStrokeDasharray={'Solid'}
            tickStrokeOpacity={0.3}
            tickStrokeWidth={1}
            tickStroke={'rgba(255, 255, 255, 0.82)'}
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
            textFill="rgba(255, 255, 255, 0.82)"
            displayFormat={timeFormat('%a, %b %d')}
            fontSize={11}
            fontFamily={defaultFont}
          />
          <BarSeries clip={false} yAccessor={d => d.value} fill={'#858999'} />
          <CurrentCoordinate displayFormat={formatValue} r={3} yAccessor={d => d.value} fill={'#FFF'} />
        </Chart>
      </ChartCanvas>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
};

BarChart.defaultProps = {
  type: 'svg',
};

export default fitWidth(BarChart);
