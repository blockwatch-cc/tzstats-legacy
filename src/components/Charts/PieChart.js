import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

const PieChart = ({ percent, color }) => {
  return (
    <CircularProgressbar
      percentage={percent}
      strokeWidth={50}
      styles={{
        path: {
          stroke: color,
          strokeLinecap: 'butt',
        },
        trail: {
          stroke: '#525566',
        },
      }}
      textForPercentage={null}
    />
  );
};
export default PieChart;
