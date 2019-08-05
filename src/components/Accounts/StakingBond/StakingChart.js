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
          let points = slice.points;

          return (
            <div
              style={{
                background: '#30313b',
                width: '250px',
                padding: '20px 20px',
                textAlign: 'center',
                opacity: 0.8,
              }}
            >
              <div>{timeFormat('%B %d, %Y')(new Date(slice.points[0].data.x))}</div>
              <div style={{ height: '2px', margin: '5px 0px', background: '#424552', width: '100%' }}></div>

              <div
                key={points[1].id}
                style={{
                  color: points[1].serieColor,
                  padding: '3px 0',
                  fontSize: '16px',
                  fontWeight: 'lighter',
                  textAlign: 'left',
                }}
              >
                <span>{points[1].serieId} :</span> {points[1].data.yFormatted.toFixed()} ꜩ
              </div>
              <div
                key={points[0].id}
                style={{
                  color: points[0].serieColor,
                  padding: '3px 0',
                  fontSize: '16px',
                  fontWeight: 'lighter',
                  textAlign: 'left',
                }}
              >
                <span>{points[0].serieId} :</span> {points[0].data.yFormatted.toFixed()} ꜩ
              </div>
              <div
                key={points[2].id}
                style={{
                  color: points[2].serieColor,
                  padding: '3px 0',
                  fontSize: '16px',
                  fontWeight: 'lighter',
                  textAlign: 'left',
                }}
              >
                <span>{points[2].serieId} :</span> {points[2].data.yFormatted.toFixed()} ꜩ
              </div>
            </div>
          );
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
