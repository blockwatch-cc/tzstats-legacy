import React, { Component } from 'react';
import * as d3 from 'd3';
import history from "../../../hooks/history";

class Chart extends Component {
  componentDidMount() {
    this.drawChart(this.props.data);
  }
  componentWillUpdate() {
    d3.select(this.refs.canvas).html('');
    this.drawChart(this.props.data);
  }

  drawChart = data => {
    const width = 830;
    const height = 250;
    const tooltipWidth = 300;

    const accountText = text => {
      text
        .selectAll('.account')
        .attr('x', d => d.x0 + 5)
        .attr('y', d => d.y0 + 15);
    };
    const shareText = text => {
      text
        .selectAll('.percent')
        .attr('x', d => d.x1 - 50)
        .attr('y', d => d.y1 - 5);
    };

    const root = d3.hierarchy(data);

    root.sum(d => {
      return d.value;
    });

    const treemapLayout = d3
      .treemap()
      .size([width, height])
      .round(false);

    treemapLayout(root);

    const svg = d3
      .select(this.refs.canvas)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const cell = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g');

    const tooltipHtml = (account, efficiencyPercent, rolls, luckPercent, share) => {
      return `<div>
            <div class="tree-map-row">
              <div class="tree-map-box">
                ${account}
                <div class="tree-map-title">Baker</div>
              </div>
              <div class="tree-map-box" style="text-align:right">
                ${efficiencyPercent}%
                <div class="tree-map-title">Efficency</div>
              </div>
            </div>
            <div class="tree-map-row" style="margin-top: 20px;">
              <div class="tree-map-box">
                ${rolls}
                <div class="tree-map-title">Rolls</div>
              </div>
              <div class="tree-map-box">
                ${luckPercent}%
                <div class="tree-map-title">Luck</div>
              </div>
              <div class="tree-map-box" style="text-align:right">
                ${share}
                <div class="tree-map-title">Share</div>
              </div>
            </div>
          </div>`;
    };

    cell
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
          .style('left', `${width - d.x0 < tooltipWidth ? d.x1 - tooltipWidth : d.x0}px`)
          .style('top', d.y1 - 120 + 'px')
          .style('opacity', 1)
          .attr('data-value', d.data.value)
          .html(
            tooltipHtml(d.data.account, d.data.efficiencyPercent, d.data.value, d.data.luckPercent, d.data.percent)
          );
      })
      .on('mouseout', function(d) {
        tooltip.style('display', 'none');
      })
      .on('click', function(d) {
        history.push('/' + d.data.address);
      });
    const accountStr = cell
      .append('text')
      .attr('font-size', 12)
      .style('fill', '#fff');

    const shareStr = cell
      .append('text')
      .attr('font-size', 16)
      .style('fill', '#fff');

    accountStr
      .append('tspan')
      .attr('class', 'account')
      .text(d => (d.x1 - d.x0 < 100 ? '' : d.data.account));
    shareStr
      .append('tspan')
      .attr('class', 'percent')
      .text(d => (d.x1 - d.x0 < 100 ? '' : d.data.percent));

    const tooltip = d3
      .select('.canvas')
      .append('div')
      .attr('id', 'tree-map-tooltip')
      .attr('opacity', 1);

    accountStr.call(accountText);
    shareStr.call(shareText);
  };

  render() {
    return <div ref="canvas" />;
  }
}

export default Chart;
