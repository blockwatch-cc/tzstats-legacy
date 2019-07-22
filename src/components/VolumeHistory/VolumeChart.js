import { ResponsiveHeatMap } from '@nivo/heatmap';
import React from 'react';

const VolumeChart = ({ data /* see data tab */ }) => {
  const tooltip = (...args) => {
    return <div>Hi there</div>;
  };
  var oneDay = 24 * 60 * 60 * 1000;
  var now = new Date().getTime();
  var d1 = new Date(now - oneDay);
  var d2 = new Date(now - 2 * oneDay);
  var d3 = new Date(now - 3 * oneDay);
  var d4 = new Date(now - 4 * oneDay);
  var d5 = new Date(now - 5 * oneDay);
  var d6 = new Date(now - 6 * oneDay);
  var d7 = new Date(now - 7 * oneDay);
  var d8 = new Date(now - 8 * oneDay);
  var d9 = new Date(now - 9 * oneDay);
  var d10 = new Date(now - 10 * oneDay);

  data = [
    { key: 1, timestamp: d1, volume: 10, price: 20 },
    { key: 2, timestamp: d2, volume: 20, price: 20 },
    { key: 3, timestamp: d3, volume: 1300, price: 20 },
    { key: 4, timestamp: d4, volume: 40, price: 20 },
    { key: 5, timestamp: d5, volume: 10, price: 20 },
    { key: 6, timestamp: d6, volume: 8000, price: 20 },
    { key: 7, timestamp: d7, volume: 1000, price: 20 },
    { key: 8, timestamp: d8, volume: 10, price: 20 },
    { key: 9, timestamp: d9, volume: 1200, price: 20 },
    { key: 10, timestamp: d10, volume: 0, price: 20 },
  ];
  return (
    <ResponsiveHeatMap
      data={data}
      keys={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      indexBy="volume"
      colors={['#415464', '#3f6575', '#3ca6ba', '#38d7ee']}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      forceSquare={true}
      cellOpacity={1}
      cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
      enableLabels={false}
      labelTextColor={{ from: 'color', modifiers: [['brighter', 1.8]] }}
      defs={[
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(0, 0, 0, 0.1)',
          rotation: -45,
          lineWidth: 4,
          spacing: 7,
        },
      ]}
      fill={[{ id: 'lines' }]}
      animate={true}
      motionStiffness={80}
      motionDamping={16}
      hoverTarget="cell"
      cellHoverOthersOpacity={0.25}
    />
  );
};
export default VolumeChart;
