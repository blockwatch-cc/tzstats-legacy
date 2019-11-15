import React from 'react';
import { useGlobal } from 'reactn';
import styled from 'styled-components';
import { FlexRowWrap, FlexColumn } from '../../Common';
import { formatDay, formatTime, getMinutesInterval } from '../../../utils';
import { Link } from 'react-router-dom';
import { format } from 'd3-format';

function mapBlocks(array, range, maxVol) {
  return array.reduce((obj, item, index) => {
    let timeIdx = range.findIndex(i => i > new Date(item.time));
    let time = timeIdx > 0 ? range[timeIdx - 1] : new Date(item.time).setUTCSeconds(0, 0);
    const prio = item.priority;
    let opacity = 1;
    switch (true) {
    case prio === 0:
      opacity = 1; break;
    case prio === 1:
      opacity = 0.8; break;
    case prio < 4:
      opacity = 0.7; break;
    case prio < 8:
      opacity =0.6; break;
    case prio < 16:
      opacity = 0.5; break;
    default:
      opacity = 0.4;
    }
    item.time = new Date(item.time);
    item.opacity = opacity;
    item.height_pct = maxVol?item.volume/maxVol:1;
    obj[time] = [...(obj[time] || []), item];
    return obj;
  }, {});
}

const BlocksChart = ({ blocks, config = {size: 60, width: 11, margin: 1} }) => {
  const [chain] = useGlobal('config');
  const timeslice = chain.time_between_blocks[0]*1000;
  const chartduration = config.size*timeslice; // in msec for N blocks
  const nowtrunc = parseInt(new Date().getTime()/timeslice)*timeslice;

  // guard against empty history
  if (!blocks.length) {
    return (<BlocksWrapper/>);
  }

  let lastBlock = blocks.slice(-1)[0];
  let firstTime = new Date(blocks[0].time).setUTCSeconds(0, 0);
  let lastTime = new Date(lastBlock.time).setUTCSeconds(0, 0);
  if (firstTime < lastTime-chartduration) {
    firstTime = lastTime-chartduration;
  }
  if (firstTime + chartduration > nowtrunc) {
    firstTime = nowtrunc - chartduration;
  }
  let timeRange = getMinutesInterval(firstTime, config.size, chain.time_between_blocks[0]);
  // console.log("Range from", firstTime, "to", lastTime, "width", config.size,
  //   "step", chain.time_between_blocks[0],
  //   "range", timeRange.length, timeRange[0], timeRange.slice(-1)[0]
  // );
  let maxVol = 0.000001;
  blocks.forEach(i => {
    maxVol = Math.max(maxVol, i.volume);
  });
  let blockMap = mapBlocks(blocks, timeRange, maxVol);
  function isMidnight(ts) {
    const d = new Date(ts);
    return d.getHours()===0&&d.getMinutes()===0;
  }

  return (
    <BlocksWrapper>
      {timeRange.map((ts, index) => {
        const blocks = (blockMap[ts]||[]).sort((a,b) => (a.is_orphan?0:1)-(b.is_orphan?0:1));
        return (
          <BlockColumn key={index} mr={config.margin}>
            {(index===0 || (isMidnight(ts) && index > 7)) && (
              <DayTick>{index < (config.size*0.85)?formatDay(ts):''}</DayTick>
            )}
            {(ts%600000===0) && (
              <TimeMajor>{index < (config.size-2)?formatTime(ts):''}</TimeMajor>
            )}
            {(ts%600000!==0 && ts%300000===0 && index < (config.size-1)) && (
              <TimeMinor></TimeMinor>
            )}
            {!blocks.length ? (
              <EmptyBlockSquare width={config.width}/>
            ) : (
              blocks.map((block, index) => {
                return (<BlockSquare
                  key={index}
                  tooltip={format(',')(block.height)}
                  height_pct={block.height_pct}
                  width={config.width}
                  to={`/${block.hash}`}
                  idx={blocks.length-1}
                  opacity={block.opacity}
                  bg={block.is_orphan?red:blue}
                />);
               })
            )}
          </BlockColumn>
        );
      })}
    </BlocksWrapper>
  );
};
export default BlocksChart;


const red = 'linear-gradient(45deg, #ED6290 0%, #FC6483 100%)';
const blue = 'linear-gradient(45deg, #26B2EE 0%, #29C0FF 100%)';

const BlocksWrapper = styled(FlexRowWrap)`
  justify-content: flex-start;
  position: relative;
`;

const BlockColumn = styled(FlexColumn)`
  margin-right: ${prop => prop.mr||1}px;
  justify-content: flex-end;
`;

const TimeMajor = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  bottom: calc(0% - 17px);
  position: absolute;
  border-left: 1px solid #83858d;
  font-weight: 100;
  height: 16px;
  width: 25px;
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const TimeMinor = styled(TimeMajor)`
  bottom: calc(0% - 9px);
  height: 8px;
`;

const DayTick = styled(TimeMajor)`
  display: none;
  bottom: calc(-100% - 13px);
  height: 34px;
  width: 95px;
`;

const EmptyBlockSquare = styled.div`
  width: ${prop => prop.width||11}px;
  height: ${prop => prop.width||11}px;
  border: 0.1rem solid transparent;
  opacity: 1;
  background: #525666;
`;

const BlockSquare = styled(Link)`
  width: ${prop => prop.width||11}px;
  height: calc(${prop => prop.width||11}px + ${prop => (prop.height_pct ? prop.height_pct*40 : 0)}px);
  opacity: ${prop => prop.opacity||1};
  border: 0.1rem solid transparent;
  z-index: 1;
  &:hover {
    opacity: 1;
    border-color: #fff;
    &:after {
      content: '${prop => prop.tooltip}';
      position: absolute;
      color: rgba(255,255,255,0.52);
      font-size: 0.88rem;
      top: -${prop => (prop.idx?prop.idx:0)*(prop.height_pct*40)+20}px;
      transform: translate(-50%,0);
      margin-left: ${prop => prop.width?((prop.width-1)/2):5}px;
    }
    &:before {
      content: ' ';
      position: absolute;
      border-left: 1px solid rgba(255, 255, 255, 0.52);
      z-index: -1;
      top: -${prop => (prop.idx?prop.idx:0)*10}px;
      left: ${prop => prop.width?((prop.width-1)/2):5}px;
      height: calc(0px + ${prop => (40 - prop.height_pct*40)}px);
    }
  }
  background: ${prop => prop.bg};
`;
