import { ResponsiveLine } from '@nivo/line';
import React from 'react';
import { timeFormat } from 'd3-time-format';
import _ from 'lodash'

const BalanceChart = ({ data }) => {

  return (
    <ResponsiveLine
      data={data}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
      curve="basis"
      margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      enableGridY={false}
      colors={['#1af3f9', '#f56389']}
      lineWidth={5}
      enablePoints={false}
      enableSlices="x"
      crosshairType="x"
      useMesh={true}
      legends={[]}
      theme={theme}
      pointSize={3}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      sliceTooltip={({ slice }) => {
        return (
          <div
            style={{
              background: '#30313b',
              width: '200px',
              padding: '20px 20px',
              textAlign: 'center',
              opacity: 0.8,
            }}
          >
            <div>{timeFormat('%B %d, %Y')(new Date(slice.points[0].data.x))}</div>
            <div style={{ height: '2px', margin: '5px 0px', background: '#424552', width: '100%' }}></div>
            {slice.points.map(point => (
              <div
                key={point.id}
                style={{
                  color: point.serieColor,
                  padding: '3px 0',
                  fontSize: '16px',
                  fontWeight: 'lighter',
                  textAlign: 'left',
                }}
              >
                <span>{point.serieId} :</span> {point.data.yFormatted} ꜩ
              </div>
            ))}
          </div>
        );
      }}
    />
  );
};
const theme = {
  crosshair: {
    line: {
      stroke: '#4c4f5f',
      strokeWidth: 0,
      strokeOpacity: 1,
      strokeDasharray: '6 6',
    },
  },
};

export default BalanceChart;
