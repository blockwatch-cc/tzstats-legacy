import React from 'react';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { SquareMarker } from 'react-stockcharts/lib/series';
import { CrossHairCursor } from 'react-stockcharts/lib/coordinates';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { scaleLinear } from 'd3-scale';
import ScatterSeries from './ScatterSeries';
import HoverTooltip from './HoverTooltip';

const RightsChart = props => {
  const { type, data: initialData, ratio, width } = props;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.x));
  let { data } = xScaleProvider(initialData);

  const zoomEvent = false;
  const panEvent = false;
  const clamp = false;
  const zoomAnchor = function(e) {};

  function tooltipContent() {
    return ({ currentBlocks }) => {
      if (!currentBlocks) {
        return null;
      }
      let baking = currentBlocks.blocks.filter(item => item.isBaking).length;
      let endorsed = currentBlocks.blocks.filter(item => item.isEndorsed).length;
      let stolen = currentBlocks.blocks.filter(item => item.isStolen).length;
      let lost = currentBlocks.blocks.filter(item => item.isLost).length;
      let missed = currentBlocks.blocks.filter(item => item.isMissed).length;
      return {
        x: currentBlocks.interval,
        y: [
          {
            label: 'Baking:',
            stroke: 'rgba(255, 255, 255, 0.52)',
            value: baking,
          },
          {
            label: 'Endorsed:',
            stroke: 'rgba(255, 255, 255, 0.52)',
            value: endorsed,
          },
          {
            label: 'Stolen:',
            stroke: 'rgba(255, 255, 255, 0.52)',
            value: stolen,
          },
          {
            label: 'Lost:',
            stroke: 'rgba(255, 255, 255, 0.52)',
            value: lost,
          },
          {
            label: 'Missed:',
            stroke: 'rgba(255, 255, 255, 0.52)',
            value: missed,
          },
        ],
      };
    };
  }

  return (
    <ChartCanvas
      height={160}
      width={width}
      seriesName={''}
      margin={{
        left: -5,
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
      xScale={scaleLinear([0, 63])}
      xAccessor={d => d.x}
      xExtents={[0, 63]}
    >
      <Chart id={1} height={160} yExtents={[d => [0, 16]]}>
        <ScatterSeries
          clip={false}
          yAccessor={d => 1}
          color={d => d.color}
          marker={SquareMarker}
          markerProps={{ width: 10, opacity: 1, stroke: '#444754' }}
        />
        <HoverTooltip
          yAccessor={d => d}
          tooltipContent={tooltipContent()}
          bgOpacity={0}
          fontSize={12}
          fontFamily={'sans-serif'}
        />
        <CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
      </Chart>
    </ChartCanvas>
  );
};

export default fitWidth(RightsChart);
