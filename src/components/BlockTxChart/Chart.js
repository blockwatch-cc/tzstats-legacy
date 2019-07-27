
import { ResponsivePie } from '@nivo/pie'
import React from 'react';
import { DataBox } from '../Common'

const BlocksPie = ({ data }) => {

  const getBarColor = bar => bar.color;
  return (<div style={{ width: 230, height: 200 }}>

    <ResponsivePie
      data={data}
      innerRadius={0.7}
      padAngle={1.5}
      cornerRadius={0}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      cornerRadius={3}
      borderWidth={1}
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
        legends: {

          text: { color: "#fff" }

        },
      }}
      tooltip={({ id, value }) => (
        <DataBox
          value={value}
          title={`${id}`}
        />
      )}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: -75,
          itemDirection: 'left-to-right',
          itemWidth: 78,
          itemHeight: 15,
          symbolSize: 8,
          symbolShape: 'circle',
          itemTextColor: 'rgba(255, 255, 255, 0.52)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }]}

    />
  </div>)
}
export default BlocksPie;
