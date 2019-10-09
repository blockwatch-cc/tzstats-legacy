import React from 'react';
import PropTypes from 'prop-types';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { set } from 'd3-collection';
import { last } from 'react-stockcharts/lib/utils';
import { scaleOrdinal, schemeCategory10, scalePoint } from 'd3-scale';
import { CrossHairCursor, MouseCoordinateX } from 'react-stockcharts/lib/coordinates';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { StackedBarSeries, BarSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { defaultFont } from '../../../config';
import { formatValue } from '../../../utils';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';

class StackedBarChart extends React.Component {
  render() {
    const { data1, type, width, ratio } = this.props;

    const testData = [
      { time: '01-01-2019', y1: 15, y2: -4 },
      { time: '01-02-2019', y1: -5, y2: 10 },
      { time: '01-03-2019', y1: 15, y2: -4 },
      { time: '01-04-2019', y1: 15, y2: -4 },
      { time: '01-05-2019', y1: 15, y2: -4 },
      { time: '01-06-2019', y1: 15, y2: -4 },
      { time: '01-07-2019', y1: 15, y2: -4 },
      { time: '01-08-2019', y1: 15, y2: -4 },
      { time: '01-09-2019', y1: 15, y2: -4 },
      { time: '01-10-2019', y1: 15, y2: -4 },
      { time: '01-11-2019', y1: 15, y2: -4 },
      { time: '01-12-2019', y1: 15, y2: -4 },
      { time: '01-13-2019', y1: 15, y2: -4 },
      { time: '01-14-2019', y1: 15, y2: -4 },
      { time: '01-15-2019', y1: 15, y2: -4 },
      { time: '01-16-2019', y1: 15, y2: -4 },
      { time: '01-17-2019', y1: 15, y2: -4 },
      { time: '01-18-2019', y1: 15, y2: -4 },
      { time: '01-19-2019', y1: 15, y2: -4 },
      { time: '01-20-2019', y1: 15, y2: -4 },
      { time: '01-21-2019', y1: 15, y2: -4 },
      { time: '01-22-2019', y1: 15, y2: -4 },
      { time: '01-23-2019', y1: 15, y2: -4 },
      { time: '01-24-2019', y1: 15, y2: -4 },
      { time: '01-25-2019', y1: 15, y2: -4 },
      { time: '01-26-2019', y1: 15, y2: -4 },
      { time: '01-27-2019', y1: 15, y2: -4 },
      { time: '01-28-2019', y1: 15, y2: -4 },
      { time: '01-29-2019', y1: 15, y2: -4 },
      { time: '01-30-2019', y1: 15, y2: -4 },
    ];
    const yGrid = { innerTickSize: -width + 40 };

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.time));
    let { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(testData);
    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 70)]);

    const xExtents = [start, end];
    const zoomAnchor = function(e) {};
    const zoomEvent = false;
    const panEvent = false;
    const clamp = false;

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={200}
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
        <Chart id={1} yExtents={[0, d => d.y1 + d.y2]}>
          <YAxis
            axisAt="right"
            orient="right"
            ticks={4}
            tickFormat={x => format('~s')(x) + 'ꜩ'}
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
          <BarSeries yAccessor={d => d.y} />
          <BarSeries yAccessor={d => d.y} />
        </Chart>
        <CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
      </ChartCanvas>
    );
  }
}

StackedBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
};

StackedBarChart.defaultProps = {
  type: 'svg',
};
StackedBarChart = fitWidth(StackedBarChart);

export default StackedBarChart;
