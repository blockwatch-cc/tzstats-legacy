import React from 'react';
import { DataBox } from '../../Common';
import { ResponsivePie } from '@nivo/pie';

const ExchangesVolumePie = ({ data }) => {
  const getBarColor = bar => bar.color;

  return (
    <div style={{ width: 150, height: 150 }}>
      <ResponsivePie
        data={data}
        padAngle={1.5}
        cornerRadius={0}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        innerRadius={0.7}
        colors={getBarColor}
        borderWidth={1}
        enableSlicesLabels={false}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        enableRadialLabels={false}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltip={({ id, value, color, percent }) => (
          <DataBox
            valueType="currency"
            valueSize="14px"
            valueOpts={{ digits: 0, round: 1 }}
            value={value}
            title={`${id} ${percent}%`}
          />
        )}
        theme={{
          tooltip: {
            container: {
              background: '#333',
              whiteSpace: 'nowrap',
            },
          },
        }}
      />
    </div>
  );
};

export default ExchangesVolumePie;
