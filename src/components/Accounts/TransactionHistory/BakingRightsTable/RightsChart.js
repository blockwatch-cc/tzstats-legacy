import React from 'react';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';
import { SingleValueTooltip } from 'react-stockcharts/lib/tooltip';
import { ChartCanvas, Chart, ZoomButtons } from 'react-stockcharts';
import { BarSeries, SquareMarker, GenericChartComponent } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  MouseCoordinateY,
  MouseCoordinateX,
  PriceCoordinate,
} from 'react-stockcharts/lib/coordinates';
import { LabelAnnotation, Label, Annotate } from 'react-stockcharts/lib/annotation';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';
import _ from 'lodash';
import { scalePoint, scaleLinear } from 'd3-scale';
import ScatterSeries from './ScatterSeries';
import { HoverTooltip } from 'react-stockcharts/lib/tooltip';

const RightsChart = props => {
  const { type, data: initialData, ratio, width } = props;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.x));
  let { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);

  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 70)]);

  const xExtents = [start, end];

  const zoomEvent = false;

  const panEvent = false;
  const clamp = false;
  const zoomAnchor = function(e) {};

  function tooltipContent(ys) {
    return ({ currentItem, xAccessor }) => {
      return {
        x: currentItem,
        y: [
          {
            label: 'open',
            value: currentItem.x,
          },
        ]
          .concat(
            ys.map(each => ({
              label: each.label,
              value: each.value(currentItem),
            }))
          )
          .filter(line => line.value),
      };
    };
  }

  return (
    <ChartCanvas
      height={195}
      width={width}
      seriesName={''}
      margin={{
        left: 5,
        right: 5,
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
      xScale={scaleLinear([0, 32])}
      xAccessor={d => d.x}
      xExtents={[0, 32]}
    >
      <Chart id={3} height={190} yExtents={[d => [0, 16]]}>
        <HoverTooltip
          yAccessor={d => d.y5}
          tooltipContent={tooltipContent([
            {
              label: `111`,
              value: d => d.y1,
            },
          ])}
          bgOpacity={0}
          fontSize={15}
        />
        <ScatterSeries
          clip={false}
          yAccessor={d => d.data[0]}
          color={d => d.color}
          marker={SquareMarker}
          markerProps={{ width: 10, opacity: 1, stroke: '#444754' }}
        />
        );
      </Chart>
      <CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
    </ChartCanvas>
  );
};

export default fitWidth(RightsChart);

{
  /* <XAxis
          axisAt="bottom"
          orient="bottom"
          ticks={10}
          tickFormat={x => x}
          showDomain={false}
          innerTickSize={0}
          fontWeight={300}
          fontSize={11}
          strokeWidth={0}
          tickPadding={-5}
          tickStroke={'rgba(255, 255, 255, 0.52)'}
          fontFamily={"-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif"}
        /> */
}
