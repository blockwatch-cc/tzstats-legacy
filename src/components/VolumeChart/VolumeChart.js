import React from "react";
import ReactDOM from "react-dom";
import { DataBox } from '../Common'
import { ResponsiveWaffleHtml } from "@nivo/waffle";


const VolumeChart = ({ data }) => {

  return (
    <div style={{ flex: 1, height: 150, width: 260 }}>
      <ResponsiveWaffleHtml
        cellComponent={CustomCell}
        data={data.slice(1)}
        total={180}
        rows={6}
        columns={30}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
        colorBy="color"
        borderColor="inherit:darker(0.3)"
        animate={true}
        motionStiffness={90}
        motionDamping={11}
      />
    </div>
  );
};

const CustomCell = ({
  size,
  x,
  y,
  color,
  opacity,
  borderWidth,
  borderColor,
  data,
  value,

}) => {

  return (<div
    style={{
      position: "absolute",
      top: y,
      left: x,
      fill: "#fff",
      width: size,
      height: size,
      background: "#1af9ff",
      opacity: data && data.opacity ? data.opacity : 1,
      boxSizing: "content-box",
      borderStyle: "solid",
      borderWidth: `${borderWidth}px`,
      borderColor,

    }}
    onMouseOver={event => {

    }}
    onClick={event => {

    }}
  />)
};

export default VolumeChart;
