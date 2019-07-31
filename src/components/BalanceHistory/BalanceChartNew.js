
import React from "react";
import PropTypes from "prop-types";
import { timeFormat } from 'd3-time-format';
import { scaleTime } from "d3-scale";
import { curveMonotoneX, curveNatural, curveLinear } from "d3-shape";
import { CrossHairCursor, MouseCoordinateY, MouseCoordinateX, PriceCoordinate } from 'react-stockcharts/lib/coordinates';
import { ChartCanvas, Chart } from "react-stockcharts";
import { LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { LabelAnnotation, Label, Annotate } from "react-stockcharts/lib/annotation";
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";
import _ from 'lodash';
import { format } from 'd3-format';


class BalanceChartNew extends React.Component {

  render() {

    const { data, width } = this.props;
    // const max = _.maxBy(data, function (o) { return o.value; }).value;
    // const min = _.minBy(data, function (o) { return o.value; }).value;

    return (
      <div style={{ height: 130, width: 300 }}>
        <ChartCanvas
          seriesName={""}
          ratio={2}
          height={125}
          width={width}
          margin={{
            left: 0, right: 50, top: 10, bottom: 20
          }}
          data={data}
          type={"svg"}
          panEvent={panEvent}
          zoomEvent={zoomEvent}
          clamp={clamp}

          xAccessor={d => d && d.time}
          xScale={scaleTime()}
        >
          <Chart
            id={0}
            opacity={1}
            height={50}
            yExtents={d => [d.inFlow]}>
            <MouseCoordinateX
              opacity={1}
              at="bottom"
              orient="bottom"
              dx={200}
              fill="#424552"
              textFill="rgba(255, 255, 255, 0.52)"
              displayFormat={timeFormat('%a, %d %B')}
            />
            <MouseCoordinateY
              at="right"
              orient="right"
              textFill="rgba(255, 255, 255, 0.52)"
              opacity={0}
              lineStroke={"#858999"}
              displayFormat={format('.2s')}
            />
            <LineSeries strokeWidth={3} yAccessor={d => d.inFlow} stroke="#1af3f9" />
            <CrossHairCursor ratio={2} stroke="#FFFFFF" />
          </Chart>
          <Chart
            id={1}
            opacity={1}
            height={50}
            origin={(w, h) => [0, 50]}
            yExtents={d => [d.outFlow]}>
            <MouseCoordinateY
              at="right"
              orient="right"
              textFill="rgba(255, 255, 255, 0.52)"
              opacity={0}

              lineStroke={"#858999"}
              displayFormat={format('.2s')}
            />
            <LineSeries strokeWidth={3} yAccessor={d => d.outFlow} stroke="#83899B" />
          </Chart>
        </ChartCanvas>
      </div>
    )
  }
}

const zoomEvent = false;
const panEvent = false;
const clamp = false;

export default fitWidth(BalanceChartNew);
