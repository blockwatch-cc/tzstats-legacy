import React from 'react';
import styled from 'styled-components';
import { Card, DataBox } from '../../Common';
import { useGlobal } from 'reactn';
import { format } from 'd3-format';
import { ResponsivePie } from '@nivo/pie';

const ExchangesVolumePie = ({ data }) => {
  const getBarColor = bar => bar.color;

  return (
    <div style={{ flex: 1, width: 270, height: 190 }}>
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
          <DataBox valueType="currency-fixed" value={value} title={`${id} ${percent}%`} />
        )}
        theme={{
          tooltip: {
            container: {
              background: '#333',
            },
          },
        }}
      />
    </div>
  );
};

export default ExchangesVolumePie;
