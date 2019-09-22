import React from 'react';
import { useGlobal } from 'reactn';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { SquareMarker } from 'react-stockcharts/lib/series';
import { CrossHairCursor } from 'react-stockcharts/lib/coordinates';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { scaleLinear } from 'd3-scale';
import ScatterSeries from './ScatterSeries';
import HoverTooltip from './HoverTooltip';

const RightsChart = props => {
  const [config] = useGlobal('config');
  const { type, data: initialData, ratio, width } = props;
  const xScale = config.blocks_per_cycle>128?64:32;
  const yScale = config.blocks_per_cycle>128?16:4;
  const size = config.blocks_per_cycle>128?10:20;
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
      let isEmpty = !baking&&!endorsed&&!stolen&&!lost&&!missed;
      let isFuture = currentBlocks.blocks.some(item => item.isFuture);
      let res = {
        x: currentBlocks.interval,
        y: []
      };
      if (!isEmpty) {
        res.y.push({
            label: isFuture?'Baking Rights:':'Blocks Baked:',
            stroke: 'rgba(255, 255, 255, 0.52)',
            value: baking||'-',
          },
          {
            label: isFuture?'Endorsing Rights:':'Blocks Endorsed:',
            stroke: 'rgba(255, 255, 255, 0.52)',
            value: endorsed||'-',
          }
        );
      } else {
        res.y.push({
          label: 'No rights.',
          stroke: 'rgba(255, 255, 255, 0.52)',
          value: ''
        });
      }
      if (!isFuture&&!isEmpty) {
        res.y.push({
            label: 'Blocks Stolen:',
            stroke: 'rgba(255, 255, 255, 0.52)',
            value: stolen||'-',
          },
          {
            label: 'Blocks Lost:',
            stroke: 'rgba(255, 255, 255, 0.52)',
            value: lost||'-',
          },
          {
            label: 'Endorsements Missed:',
            stroke: 'rgba(255, 255, 255, 0.52)',
            value: missed||'-',
          }
        );
      }
      return res;
    };
  }

  return (
    <ChartCanvas
      height={yScale*size}
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
      xScale={scaleLinear([0, xScale])}
      xAccessor={d => d.x}
      xExtents={[0, xScale]}
    >
      <Chart id={1} height={yScale*size} yExtents={[d => [0, yScale]]}>
        <ScatterSeries
          clip={false}
          yAccessor={d => 1}
          color={d => d.color}
          marker={SquareMarker}
          markerProps={{ width: size, height: size, opacity: 1, stroke: '#444754' }}
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
