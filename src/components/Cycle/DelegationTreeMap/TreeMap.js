import React, { Component } from 'react';
import * as d3 from 'd3';

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
          kickStarter: kickStarter,
        };
        this.setState(state, this.drawChart.bind(this));
      });
  }

  drawChart() {
    const kickStarter = this.state.kickStarter;

    const width = 700;
    const height = 200;
    const x = d3
      .scaleLinear()
      .domain([0, width])
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain([0, height])
      .range([0, height]);

    const colorScale = function(color) {
      return d3.interpolateRgb(color, '#fff')(0.2);
    };
    const color = d3.scaleOrdinal(d3.schemeCategory20.map(colorScale));
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
      .attr('transform', 'translate(' + (width - 550) / 2.0 + ')');

    // const tooltip = d3
    //   .select('.canvas')
    //   .append('div')
    //   .attr('class', 'toolTip')
    //   .attr('id', 'tooltip')
    //   .attr('opacity', 0);

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
      .style('fill', d => color(d.data.category))
      .style('stroke', 'black')
      .attr('opacity', 0.5)
      .attr('data-name', d => d.data.name)
      .attr('data-category', d => d.data.category)
      .attr('data-value', d => d.data.value);
    //   .on('mouseover', function(d, i) {
    //     tooltip
    //       .style('display', 'inline-block')
    //       .style('left', d3.event.pageX + 20 + 'px')
    //       .style('top', d3.event.pageY + 'px')
    //       .style('opacity', 0.9)
    //       .attr('data-name', d.data.name)
    //       .attr('data-category', d.data.category)
    //       .attr('data-value', d.data.value)
    //       .html('Name: ' + d.data.name + '<br/>Category: ' + d.data.category + '<br/>Value: ' + d.data.value);
    //   })
    //   .on('mouseout', function(d) {
    //     tooltip.style('display', 'none');
    //   });

    svg
      .append('text')
      .attr('x', width / 5)
      .attr('y', height - 65);

    svg
      .append('text')
      .attr('x', width / 3)
      .attr('y', height - 65);
  }

  render() {
    return <div id="" />;
  }
}

export default Chart;
