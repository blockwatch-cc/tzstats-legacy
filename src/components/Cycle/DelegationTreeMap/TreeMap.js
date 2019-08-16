import React, { Component } from 'react';
import * as d3 from 'd3';
import { DataBox, FleRow, FlexColumn } from '../../Common';

let kickStarterData =
  'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countyData: {},
      eduData: {},
    };
  }

  componentDidMount() {
    d3.queue()
      .defer(d3.json, kickStarterData)
      .await((error, kickStarter) => {
        kickStarter.children = [kickStarter.children[0]];
        const state = {
          kickStarter: this.props.data,
        };

        this.setState(state, this.drawChart.bind(this));
      });
  }

  drawChart() {
    const kickStarter = this.state.kickStarter;

    const width = 830;
    const height = 250;
    const x = d3
      .scaleLinear()
      .domain([0, width])
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain([0, height])
      .range([0, height]);

    const text1 = text => {
      text
        .selectAll('.account')
        .attr('x', d => d.x0 + 5)
        .attr('y', d => d.y0 + 15);
    };
    const text2 = text => {
      text
        .selectAll('.percent')
        .attr('x', d => d.x1 - 50)
        .attr('y', d => d.y1 - 5);
    };
    // const colorScale = function(color) {
    //   return d3.interpolateRgb(color, '#fff')(0.2);
    // };
    // const color = d3.scaleOrdinal(d3.schemeCategory20.map(colorScale));
    const root = d3.hierarchy(kickStarter);

    root.sum(d => {
      return d.value;
    });

    const treemapLayout = d3
      .treemap()
      .size([width, height])
      .round(false);

    treemapLayout(root);

    const svg = d3
      .select('.canvas')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', 'translate(' + (width - 830) / 2.0 + ')');

    const cell = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .style('left', function(d) {
        return x(d.x0) + '%';
      })
      .style('top', function(d) {
        return y(d.y0) + '%';
      })
      .style('width', function(d) {
        return x(d.x1) - x(d.x0) + '%';
      })
      .style('height', function(d) {
        return y(d.y1) - y(d.y0) + '%';
      })
      .attr('class', 'group');
    const tile = cell
      .append('rect')
      .attr('class', 'tile')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .style('fill', '#418BFD')
      .style('stroke', '#444755')
      .style('stroke-width', 1)
      .attr('opacity', d => d.data.opacity)
      .on('mouseover', function(d, i) {
        tooltip
          .style('display', 'inline-block')
          .style('left', d.x0 + 'px')
          .style('top', d.y1 - 120 + 'px')
          .style('opacity', 1)
          .attr('data-value', d.data.value).html(` <div class="tree-map-row">
          <div class="tree-map-box">
            ${d.data.account}
          <div class="tree-map-title">Baker</div>
          </div>
          <div class="tree-map-box" style="text-align:right">
          ${14}%
          <div class="tree-map-title">Efficency</div>
          </div>
        </div>
        <div class="tree-map-row">
          <div class="tree-map-box">
          ${d.data.value}
          <div class="tree-map-title">Rolls</div>
          </div>
          <div class="tree-map-box">
          ${24}%
          <div class="tree-map-title">Luck</div>
          </div>
          <div class="tree-map-box">
          ${41.5}%
          <div class="tree-map-title">Share</div>
          </div>
        </div>`);
      })
      .on('mouseout', function(d) {
        tooltip.style('display', 'none');
      })
      .on('click', function(d) {
        window.location.href = '/account/' + d.data.address;
      });
    const t1 = cell
      .append('text')
      .attr('font-size', 12)
      .style('fill', '#fff');

    const t2 = cell
      .append('text')
      .attr('font-size', 16)
      .style('fill', '#fff');

    t1.append('tspan')
      .attr('class', 'account')
      .text(d => (d.x1 - d.x0 < 100 ? '' : d.data.account));
    t2.append('tspan')
      .attr('class', 'percent')
      .text(d => d.data.percent);

    const tooltip = d3
      .select('.canvas')
      .append('div')
      .attr('id', 'tree-map-tooltip')
      .attr('opacity', 1);

    t1.call(text1);
    t2.call(text2);
  }

  render() {
    return <div id="" />;
  }
}

export default Chart;
