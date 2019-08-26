import React from 'react';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { SquareMarker } from 'react-stockcharts/lib/series';
// import { CrossHairCursor } from 'react-stockcharts/lib/coordinates';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { scaleLinear } from 'd3-scale';
import ScatterSeries from './ScatterSeries';
// import { HoverTooltip } from 'react-stockcharts/lib/tooltip';

const RightsChart = props => {
  const { type, data: initialData, ratio, width } = props;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.x));
  let { data } = xScaleProvider(initialData);

  const zoomEvent = false;
  const panEvent = false;
  const clamp = false;
  const zoomAnchor = function(e) {};

  // const getStats = function(data) {
  //   let totalEndorsed = 0;
  //   let totalLost = 0;
  //   let totalBaking = 0;
  //   let totalStolen = 0;
  //   let totalMissed = 0;
  //   function sum(item) {
  //     totalEndorsed += item.isEndorsed ? 1 : 0;
  //     totalBaking +=  item.isBaking ? 1 : 0;
  //     totalLost += item.isLost ? 1 : 0;
  //     totalStolen += item.isStolen ? 1 : 0;
  //     totalMissed += item.isMissed ? 1 : 0;
  //   }
  //   for (let index = 0; index < data.length; index++) {
  //     const subData = data[index];
  //     subData.forEach(sum);
  //   }
  //   return { totalEndorsed, totalLost, totalBaking, totalStolen, totalMissed };
  // };

  // function tooltipContent() {
  //   return ({ currentItem, xAccessor }) => {
  //     const x = xAccessor(currentItem);
  //     const data = currentItem.data
  //     let stats = getStats(currentItem);
  //     return {
  //       x: 'Height',
  //       // x: `${format(data[x]?data[x][0].height:0, ",") - format(data[x]?data[x].splice(-1).height:0, ",") }`,
  //       y: [
  //         {
  //           label: 'Endorsed Blocks',
  //           value: stats.totalEndorsed,
  //         },
  //         {
  //           label: 'Baked Blocks',
  //           value: stats.totalBaking,
  //         },
  //         {
  //           label: 'Stolen Blocks',
  //           value: stats.totalStolen,
  //         },
  //         {
  //           label: 'Lost Blocks',
  //           value: stats.totalLost,
  //         },
  //         {
  //           label: 'Missed Endorsements',
  //           value: stats.totalMissed,
  //         },
  //       ],
  //     };
  //   };
  // }

  return (
    <ChartCanvas
      height={190}
      width={width}
      seriesName={''}
      margin={{
        left: -5,
        right: 5,
        top: -10,
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
      <Chart id={1} height={190} yExtents={[d => [0, 15]]}>
        <ScatterSeries
          clip={false}
          yAccessor={d => 1}
          color={d => d.color}
          marker={SquareMarker}
          markerProps={{ width: 10, opacity: 1, stroke: '#444754' }}
        />
      </Chart>
    </ChartCanvas>
  );
};

export default fitWidth(RightsChart);

/*<HoverTooltip
  yAccessor={d => d}
  tooltipContent={tooltipContent()}
  bgOpacity={0}
  fontSize={12}
  fontFamily={"sans-serif"}
/>
<CrossHairCursor ratio={ratio} stroke="#FFFFFF" />
*/
