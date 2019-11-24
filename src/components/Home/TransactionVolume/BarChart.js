import React from 'react';
import { utcFormat } from 'd3-time-format';
import { scaleTime } from 'd3-scale';
import { MouseCoordinateX } from 'react-stockcharts/lib/coordinates';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { BarSeries } from 'react-stockcharts/lib/series';
import { fitWidth } from 'react-stockcharts/lib/helper';
import _ from 'lodash';
import { CurrentCoordinate } from '../../Common';
import { formatCurrencyShort } from '../../../utils';
import { defaultFont } from '../../../config';

class BarChart extends React.Component {
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
        width={width}
        seriesName={''}
        ratio={2}
        margin={{
          left: 10,
          right: 10,
          top: 0,
          bottom: 0,
        }}
        clip={false}
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

          <BarSeries
            clip={false}
            width={width/30 - (width<768?3:8)}
            yAccessor={d => d.value}
            fill={'#29C0FF'} />

          <CurrentCoordinate displayFormat={formatCurrencyShort} r={0} yAccessor={d => d.value} fill={'#FFF'} />
        </Chart>
      </ChartCanvas>
    );
  }
}

const zoomEvent = false;
const panEvent = false;
const clamp = false;

export default fitWidth(BarChart);
