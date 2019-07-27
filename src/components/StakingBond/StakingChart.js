import { ResponsiveLine } from '@nivo/line';
import React from 'react';
import { timeFormat } from 'd3-time-format';

const StakingChart = ({ data /* see data tab */ }) => {


  return (
    <div style={{ flex: 1, height: 180, width: 600 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
        curve="basis"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        colors={['#1af3f9', '#418bfd', '#f56389']}
        lineWidth={0}
        enableArea={true}
        areaBaselineValue={20}
        areaOpacity={1}
        enablePoints={false}
        enableSlices="x"
        useMesh={true}
        legends={[]}
        theme={theme}
        sliceTooltip={({ slice }) => {

        }}
      />
    </div>
  );
};
const theme = {
  crosshair: {
    line: {
      stroke: '#4c4f5f',
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDasharray: '6 6',
    },
  },
};

export default StakingChart;
