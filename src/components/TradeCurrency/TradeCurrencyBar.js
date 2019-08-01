import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, Devices } from '../Common';
import { VerticalProgressBar } from '../ProgressBar';
import { useGlobal } from 'reactn';
import { format } from 'd3-format';

import { ResponsiveBar } from '@nivo/bar'

const data = [
  {
    id: "USD",
    valor: 13133,
    color: "#18ecf2"
  },
  {
    id: "B",
    valor: 13315,
    color: "#29bcfa"
  },
  {
    id: "1C",
    valor: 31232,
    color: "#3e85f1"
  },
  {
    id: "2C",
    valor: 23412,
    color: "#858999"
  },
  {
    id: "22C",
    valor: 241441,
    color: "#646876"
  },
  {
    id: "14C",
    valor: 214410,
    color: "#30313b"
  },
  {
    id: "C",
    color: "#797c8c",
    valor: 41414
  }
]


const getBarColor = bar => bar.data.color;
const TradeCurrencyBar = ({ data1 }) => (
  <Wrapper >
    <ResponsiveBar
      data={data}
      keys={["valor"]}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      padding={0.7}
      colors={getBarColor}
      borderColor="black"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridY={false}
      enableLabel={false}
      labelSkipWidth={4}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      tooltip={({ id, value, color, title }) => (
        <span>
          {/* {id} */}
          <DataBox
            valueType="currency-fixed"
            value={value} />
        </span>
      )}
      theme={{
        tooltip: {
          container: {
            background: '#424552',

          },
        },
      }}
    />
  </Wrapper>
)

const Wrapper = styled.div`
    flex: 1;
    width:380px;
    height: 150px;
    margin-left:-35px;
    @media ${Devices.mobileS} {
      width: 260px;
    }
    @media ${Devices.mobileM} {
      width: 260px;
    }
    @media ${Devices.mobileL} {
      width: 260px;
    }

`;


export default TradeCurrencyBar;
