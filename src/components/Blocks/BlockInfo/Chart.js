import { ResponsivePie } from '@nivo/pie';
import React from 'react';
import { DataBox } from '../../Common';

const BlocksPie = ({ data, setTxType }) => {
  const getBarColor = bar => bar.color;
  return (
    <div style={{ width: 120, height: 120, cursor: 'pointer' }}>
      <ResponsivePie
        data={data}
        innerRadius={0.7}
        padAngle={1.5}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        borderWidth={1}
        onClick={e => setTxType(e.type)}
        colors={getBarColor}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        enableSlicesLabels={false}
        enableRadialLabels={false}
        motionStiffness={90}
        motionDamping={15}
        theme={{
          tooltip: {
            container: {
              background: '#333',
            },
          },
        }}
        tooltip={({ id, value }) => <DataBox valueSize={'12px'} valueType="text" value={id} />}
      />
    </div>
  );
};
export default BlocksPie;
